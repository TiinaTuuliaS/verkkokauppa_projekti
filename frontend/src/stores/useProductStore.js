import {create} from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";




export const useProductStore = create((set) => ({
    products: [],
    loading: false,

    setProducts: (products) => set({ products }),


    createProduct: async (productData) => {
        set({ loading: true });
        try {
            const res = await axios.post("/products", productData);
            set((prevState) => ({
                products: [...prevState.products, res.data],
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "Virhe tuotteen luomisessa");
        }
    },

    fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products"); //haetaan tuoteet tietokannasta
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
 //funktio joka hakee tuoteet categorioittain gateroria sivulle
		fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},

    //funktio tuotteen poistamiselle
    deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Virhe tuotteen poistamisessa");
		}
	},

    //tuote merkitään suosikiksi ''featured'' tietokannassa ja verkkokaupassa
    	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// päivittää isFeatured propin, ominaisuuden tuotteeseen
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Virhe featured toiminnossa");
		}
	},
  //funktio joka hakee featured eli esittelyssä olevat tuottteet
	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured"); //axios pyyntö backendiin
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Tuotteita ei voitu hakea", loading: false });
			console.log("Error featured tuotteita ei voitu hakea:", error);
		}
	},
   

}));