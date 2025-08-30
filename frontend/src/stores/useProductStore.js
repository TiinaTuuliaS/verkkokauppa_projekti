import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

//Frontin ja apin "välittäjät" note to self

export const useProductStore = create((set) => ({
    products: [],
    featuredProducts: [],   // <-- oma tila suosikeille
    loading: false,
    error: null,

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
            toast.error(error.response?.data?.message || "Virhe tuotteen luomisessa");
        }
    },

    fetchAllProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/products");
            set({ products: response.data.products, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            toast.error(error.response?.data?.error || "Failed to fetch products");
        }
    },

    fetchProductsByCategory: async (category) => {
        set({ loading: true });
        try {
            const response = await axios.get(`/products/category/${category}`);
            set({ products: response.data.products, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            toast.error(error.response?.data?.error || "Failed to fetch products");
        }
    },

    deleteProduct: async (productId) => {
        set({ loading: true });
        try {
            await axios.delete(`/products/${productId}`);
            set((prevState) => ({
                products: prevState.products.filter(
                    (product) => product._id !== productId
                ),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.error || "Virhe tuotteen poistamisessa");
        }
    },

    toggleFeaturedProduct: async (productId) => {
        set({ loading: true });
        try {
            const response = await axios.patch(`/products/${productId}`);
            set((prevState) => ({
                products: prevState.products.map((product) =>
                    product._id === productId
                        ? { ...product, isFeatured: response.data.isFeatured }
                        : product
                ),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.error || "Virhe featured toiminnossa");
        }
    },

    fetchFeaturedProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/products/featured");
            // Tallennetaan erilliseen tilaan
            set({ featuredProducts: response.data, loading: false });
        } catch (error) {
            set({ error: "Tuotteita ei voitu hakea", loading: false });
            console.log("Error featured tuotteita ei voitu hakea:", error);
        }
    },
}));


//tuotteen muokkaus - jatkokehitysidea luodaan useproductstore olion sisälle metodina, päivitykset myös ProductList komponenttiin
//UpdateProduct: async (id, updatedData) => {
/*   try {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const data = await res.json();
    set((state) => ({
      products: state.products.map((p) => (p._id === id ? data : p)),
    }));
  } catch (error) {
    console.error("Update failed", error);
  }
},** */