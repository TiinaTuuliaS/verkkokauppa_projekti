import express from "express";
import { addToCart, removeAllFromCart, updateQuantity, getCartProducts } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Luodaan router, johon liitetään kaikki cart-reitit

// Ostoskorin reitit:

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;