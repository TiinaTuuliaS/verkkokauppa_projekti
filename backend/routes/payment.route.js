import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";



const router = express.Router();

// Luodaan router, johon liitetään kaikki payment-reitit

// Maksun reitit, protectRoute varmistaa että kirjautunut autentikoitukäyttäjä saa käyttää ominaisuutta

router.post("/create-checkout-session", protectRoute, createCheckoutSession); //ostoskorinäkymä
router.post("/checkout-success", protectRoute, checkoutSuccess); //onnistunut ostoskoritapahtuma

export default router;