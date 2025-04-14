import express from "express";
import dotenv from "dotenv";

// routes
import authRoutes from "./routes/auth.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();
//luetaan .env tiedoston sisältö

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log("Serveri käynnissä OSOITTEESSA http://localhost:" + PORT);

    connectDB();
});

// 0zDQ4zKOIf6WtJDb