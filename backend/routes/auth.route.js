import express from "express";
import { login, logout, signup, refreshToken, getProfile } from "../controllers/auth.controller.js";
import { protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

// Luodaan router, johon liitetään kaikki auth-reitit

// Reitit käyttäjien hallintaan:


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);



export default router