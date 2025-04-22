import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({ message: "Ei authorisoitu - ei accesstokenia" });
        }
try {
    
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        return res.status(401).json({ message: "Ei authorisoitu - käyttäjää ei löydy" });
    }

    req.user = user;
    next();

} catch (error) {
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Ei authorisoitu - token on vanhentunut" });
    }
    throw error;
}

    } catch (error) {
        console.log("Virhe auth middlewareissä", error.message);
        return res.status(401).json({ message: "Ei authorisoitu - virhe" });
    }
}

export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Ei pääsyä - ei admin" });
    }
}