import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";


const router = express.Router();

// Luodaan router, johon liitetään kaikki coupon-reitit

// Alennuskoodien reitit, protectRoute varmistaa että vain kirjautunut käyttäjä saa käyttöönsä kupongin yms

router.get("/", protectRoute, getCoupon)
router.post("/validate", protectRoute, validateCoupon)

export default router