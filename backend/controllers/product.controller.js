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
        let featuredProducts = await redis.get("featured_products"); 

        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        // jos ei ole rediksessä, etsi tietokannasta
        featuredProducts = await Product.find({ isFeatured: true }).lean();  

        if (!featuredProducts || featuredProducts.length === 0) {
            return res.status(404).json({ message: "Ei featured-tuotteita" });
        }

        // tallenna redis cacheen
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
    console.log("Request body:", req.body); 

    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      console.log("Uploading image to Cloudinary...");
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
      console.log("Cloudinary response:", cloudinaryResponse);
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
      category,
      
    });

    console.log("Product created:", product);

    res.status(201).json(product);
  } catch (error) {
    console.error("Virhe tuotecontrollerissa:", error);
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
            const publicId = product.image.split("/").pop().split(".")[0]; 
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("Kuva poistettu cloudinarystä")
            } catch (error) {
                console.log("Virhe kuvan poistossa cloudinarystä", error.message);
            }
        }

        await Product.findByIdAndDelete(req.params.id)
        res.json({message: "Tuote poistettu onnistuneesti"})

    } catch (error) {
        console.log("Virhe tuotteen poistocontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
}

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: {size: 3} },
            { $project:{ _id: 1, name: 1, description: 1, image : 1, price: 1 } }
        ])
        res.json(products)
    } catch (error) {
        console.log("Virhe tuotecontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
}

export const getProductsByCategory = async (req, res) => {
    const {category} = req.params; 
    try {
        const products = await Product.find({category});
        res.json({ products }); 
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
            // päivitetään cache
            await updateFeaturedProductsCache();
            res.json(updatedProduct);
        } else {
            res.status(404).json({message: "Tuotetta ei löytynyt"});
        }
    } catch (error) {
        console.log("Virhe tuotecontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
}

async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({isFeatured: true}).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Virhe cache:n päivittämisessä", error.message);
    }
}
