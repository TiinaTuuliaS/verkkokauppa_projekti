import mongoose from "mongoose";

//Luodaan tietokantamalli tuotteelle MongoDb tietokantaan

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nimi on pakollinen tieto"],
    },
    description: {
        type: String,
        required: [true, "Kuvaus on pakollinen tieto"],
    },
    price: {
        type: Number,
        min: 0,
        required: [true, "Hinta on pakollinen tieto"]
    },
    image: {
        type: String,
        required: [true, "Kuvan URL on pakollinen tieto"]
    },
    category: {
        type: String,
        required: [true, "Kategoria on pakollinen tieto"]
    }, 
    isFeatured: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product

