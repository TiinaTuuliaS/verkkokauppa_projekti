import express from "express";
import { 
    deleteProduct, 
    createProduct, 
    getAllProducts, 
    getFeaturedProducts,
    getRecommendedProducts,
    getProductsByCategory,
    toggleFeaturedProduct
 } from "../controllers/product.controller.js"; //tuotekontrollerin funktiot routeriin
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Luodaan router, johon liitetään kaikki product-reitit

// Tuotereitit, osa suojattu jotta vain admin pääsee niitä käyttämään ja osa vain kirjautuneille käyttäjille

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;