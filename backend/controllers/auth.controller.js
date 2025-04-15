import { redis } from '../lib/redis.js';
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";



const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    })

    const refreshToken = jwt.sign({ userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    })

    return { accessToken, refreshToken };
};

const storeRefreshToken = async(userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX",7*24*60*60); // token voimassa 7päivää
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, //estä xss hyökkäykset, cookieen ei pääse käsiksi esim javascriptin kautta
        secure:  process.env.NODE_ENV === "production",
        sameSite:"strict", //estää CSRF hyökkäykset
        maxAge: 15 * 60 * 1000, //15 minuuttia
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, //estä xss hyökkäykset, cookieen ei pääse käsiksi esim javascriptin kautta
        secure:  process.env.NODE_ENV === "production",
        sameSite:"strict", //estää CSRF hyökkäykset
        maxAge: 7 * 24 * 60 * 60* 1000, //7 päivää
    });

};

//käyttäjä luodaan
export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const userExists = await User.findOne({ email });

    if(userExists) {
        return res.status(400).json({message: "Käyttäjä on jo olemassa"});
    }
    const user = await User.create({name,email,password});

    // authenticate user, luodaan tokenit

    const {accessToken, refreshToken} = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    //luodaan cookiet

    setCookies(res, accessToken, refreshToken);


    res.status(201).json({ user:{
        _id: user._id, 
        name: user.name,
        email: user.email,
        role: user.role,
    }, message: "Käyttäjä luotu onnistuneesti!"
});
    } catch (error) {
        console.log("Virhe yhdistettäessä MongoDB tietokantaan", error.message);
        res.status(500).json({ message: error.message });
    }

    
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if(user && (await user.comparePassword(password))) {
            const {accessToken, refreshToken} = generateTokens(user._id)

            await storeRefreshToken(user._id, refreshToken)
            setCookies(res, accessToken, refreshToken)

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            })
        }
    } catch (error) {
        console.log("Error sisäänkirjautumiscontrollerissa", error.message);
        res.status(500).json({ message: error.message });
        
    }
}

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
           
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        
        res.json({message: "Logout onnistui"}).sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
};