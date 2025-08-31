import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Tuodaan eri reittien moduulit
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js"; // tietokantayhteyden muodostaminen

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname polyfill (koska käytetään ES Module -syntaksia)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Reittien liittäminen sovellukseen
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


// Palvelin käynnistetään ja tietokantayhteys muodostetaan
app.listen(PORT, () => {
  console.log(`Serveri käynnissä OSOITTEESSA http://localhost:${PORT}`);
  connectDB();
});


