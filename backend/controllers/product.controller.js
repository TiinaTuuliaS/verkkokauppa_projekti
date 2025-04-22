import Product from "../models/product.model.js";



export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); //etsi kaikki tuotteet
        res.json({products});
    } catch (error) {
        console.log("Virhe tuotecontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
};    