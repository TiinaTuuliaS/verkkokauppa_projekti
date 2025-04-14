import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Nimi on pakollinen tieto"]
    },
    email:{
        type: String,
        required: [true, "Sähköposti on pakollinen tieto"],
        unique: true,
        lowercase: true,
        trim : true
    },
    password:{
        type: String,
        required: [true, "Salasana on pakollinen tieto"],
        minlength: [6, "Salasanassa pitää olla vähintään 6 merkkiä"]
    },
    cartItems:[
        {
            quantity:{
                typer: Number,
                default: 1
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }

        }
    ],
    role:{
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
// createdAt koska luotu, updatedAt koska muokattu
}, {
    timestamps: true
})