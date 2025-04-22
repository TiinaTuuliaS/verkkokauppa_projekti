import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); //etsi kaikki tuotteet
        res.json({products});
    } catch (error) {
        console.log("Virhe tuotecontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
};    

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products"); //etsi kaikki tuotteet
        if(!featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        //jos festured tuotteita ei ole rediksessä, etsi tietokannasta

        featuredProducts = await Product.find({Isfeatured: true}).lean();  //etsi kaikki tuotteet MONGO dbstä 
        // //.lean palauttaa javascript objekteja mongo db dokumentin sijasta
        //parantaa suorituskykyä

        if(!featuredProducts) {
            return res.status(404).json({message: "Ei featured- tuotteita"});
        }

        //tallenntaa redikseen jos löytyy mongosta mutta ei vielä sieltä

        await redis.set("featured_products", JSON.stringify(featuredProducts));
        res.json(featuredProducts);

    } catch (error) {
        console.log("Virhe tuotecontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
};