import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
                type: Number,
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
});



// salasanan salaustoiminto hook bcryptillä ennen kuin tieto tallentuu tietokantaan

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt); //tämä muuttaa salasanan cryptatuksi tietokantaan
        next()
    } catch (error) {
        next(error)
    }

})

//metodi salasanojen vertailemiseen oikein/väärin
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);

};

// user model rakennetaan

const User = mongoose.model("User", userSchema);

export default User;