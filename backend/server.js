import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Tuodaan eri reittien moduulit
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js"; //tietokantayhteyden muodostaminen

dotenv.config();
//luetaan .env tiedoston sisältö ja asennetaan ympäristömuuttujat

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb"})); // 10mb tiedostojen koko rajoitus http pyynnöissä esim post ja put

app.use(cookieParser());
// Käytetään evästeiden käsittelyä, esim. käyttäjän autentikointiin

// Reittien liittäminen sovellukseen

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

//palvelin käynnistetään ja tietokantayhteys muodostetaan

app.listen(PORT, () => {
    console.log("Serveri käynnissä OSOITTEESSA http://localhost:" + PORT);

    connectDB();
});

// 0zDQ4zKOIf6WtJDb