import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Reitit
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname polyfill ES Moduleissa
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON ja cookie-parser
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// API-reitit
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// Staattiset tiedostot tuotannossa
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(frontendPath));

  // Kaikki muut GET-pyynnöt ohjataan Reactille
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Yhteys tietokantaan
connectDB();

// Palvelin käyntiin
app.listen(PORT, () => {
  console.log(`Serveri käynnissä osoitteessa http://localhost:${PORT}`);
});
