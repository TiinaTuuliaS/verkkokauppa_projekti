import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from '../lib/cloudinary.js';



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

//luodaan tuote tietokantaan ja käytetään cloudinarya kuvien tuomiseen
export const createProduct = async (req, res) => {
    try {
        const {name, description, price, image, category} = req.body;

        let cloudinaryResponse = null

        if(image) {
            cloudinaryResponse = await cloudinary.uploloader.upload(image, {folder: "products"})
    } 

    const product = await Product.create({
        name,
        description,
        price,
        image: cloudinaryResponse?.secure.url ? cloudinaryResponse.secure_url : "",
        category
    })

    res.status(201).json(product);
    }
    
    catch (error) {
        console.log("Virhe tuotecontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).json({message: "Ei tuotetta"});
        }
        
        if(product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]; //hakee kuvan id:n ja poistaa sen
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("Kuva poistettu cloudinarystä")
            } catch (error) {
                console.log("Virhe kuvan poistossa cloudinarystä", error.message);
            }

        }

        await product.findByIdAndDelete(req.params.id)

        res.json({message: "Tuote poistettu onnistuneesti"})

    } catch (error) {
        console.log("Virhe tuotetteen poistocontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }

}

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: {size: 3}
            },
            {
                $project:{
                    _id: 1,
                    name: 1,
                    description: 1,
                    image : 1,
                    price: 1
                }
            }
        ])

        res.json(products)

    } catch (error) {
        console.log("Virhe tuotecontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
}

//hakee tuotteet gaterorioittain
export const getProductsByCategory = async (req, res) => {
    
    const {category} = req.params; 
    
    try {
        
        const products = await Product.find({category});
        res.json(products);

    } catch (error) {
        console.log("Virhe tuotecontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
    }

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            // päivitetään cashe - redis
            await updateFeaturedProductsCashe();
            res.json(updatedProduct);
        } else {
            res.status(404).json({message: "Tuotetta ei löytynyt"});
        }
    } catch (error) {
        console.log("Virhe tuotecontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
}

async function updateFeaturedProductsCashe() {
    try {
        const featuredProducts = await Product.find({isFeatured: true}).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Virhe cashen päivittämisessä", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
}