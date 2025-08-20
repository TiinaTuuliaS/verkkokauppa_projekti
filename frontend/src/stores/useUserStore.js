import {create} from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

//sisäänkirjautumisen, uloskirjautumisen ja rekisteröitymisen funktiot ja refreshtoken asiat

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,

	signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Salasanat eivät täsmää");
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password });
			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "Virhe rekisteröitymisessä");
		}
	},
	login: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axios.post("/auth/login", { email, password });

			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "Virhe sisäänkirjautumisessa");
		}
	},

	logout: async () => {
		try {
			await axios.post("/auth/logout");
			set({ user: null });
		} catch (error) {
			toast.error(error.response?.data?.message || "Virhe uloskirjautumisessa");
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile"); //tarkistetaan backendistä että käyttäjä on  authorisoitu adminkäyttäjä
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},

	//Minulle opeteltavaa ja aika hankalaa asiaa, kommentoin runsaasti että muistan mitä tehty
//olen opetellut tätä udemyn kurssilla eikä vieläkään oikein hahmotu

refreshToken: async () => {
	// Estetään useampi samanaikainen refresh-pyyntö tokenille
	if (get().checkingAuth) return;

	// Merkitään, että tarkistetaan käyttäjän autentikaatiota
	set({ checkingAuth: true });

	try {
		// Lähetetään pyyntö backendiin tokenin uusimiseksi
		const response = await axios.post("/auth/refresh-token");

		// Jos onnistuu, poistetaan "checkingAuth"-tila käytöstä
		set({ checkingAuth: false });

		// Palautetaan backendin vastaus (esim. uusi accessToken)
		return response.data;
	} catch (error) {
		// Jos tulee virhe (esim. refresh token ei ole voimassa):
		// - käyttäjä kirjataan ulos (user = null)
		// - asetetaan checkingAuth falseksi
		set({ user: null, checkingAuth: false });

		// Heitetään virhe eteenpäin, jotta sitä voidaan käsitellä muualla
		throw error;
	}
},

}));

// Axios interceptor tokenin uusimiseen kun token vanhenee 15 minuutin kuluttua

let refreshPromise = null; // Muuttuja, jolla varmistetaan ettei useita refresh-pyyntöjä tehdä samaan aikaan

axios.interceptors.response.use(
	(response) => response, // Jos vastaus on onnistunut, palautetaan se sellaisenaan

	async (error) => {
		const originalRequest = error.config; // Talletetaan alkuperäinen pyyntö

		// Jos backend palauttaa 401 (Unauthorized) JA pyyntöä ei ole jo yritetty uudelleen
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true; // Merkitään että tätä pyyntöä on jo yritetty kerran

			try {
				// Jos tokenin uusiminen on jo käynnissä, odotetaan sen valmistumista
				if (refreshPromise) {
					await refreshPromise;
					// Kun refresh on valmis, tehdään alkuperäinen uusimispyyntö uudelleen
					return axios(originalRequest);
				}

				// Muuten aloitetaan uusi tokenin uusimisprosessi
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null; // Nollataan, jotta uusi refresh voidaan tehdä myöhemmin

				// Aloitetaan alkuperäinen pyyntö uudelleen uudella tokenilla
				return axios(originalRequest);

			} catch (refreshError) {
				// Jos refresh epäonnistuu (esim. refresh token on vanhentunut):
				// - kirjataan käyttäjä ulos
				// - palautetaan virhe eteenpäin
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}

		// Jos virhe ei ole 401 tai muu käsitelty tapaus, palautetaan token normaalisti
		return Promise.reject(error);
	}
);
