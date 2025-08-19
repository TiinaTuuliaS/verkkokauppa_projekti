import Coupon from "../models/coupon.model.js";


export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ userId: req.user._id, isActive:true}); //etsii käytettävissä olevan kupongin
        res.json(coupon || null); //kupongin palautus
    } catch (error) {
        console.log("Virhe kuponkicontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
};

export const validateCoupon = async (req, res) => {
    try {
        const {code} = req.body; //käyttäjän antama kupongin koodi
        const coupon = await Coupon.findOne({code:code, userId:req.user._id,isActive:true}); //etsii kupongin koodin perusteella
        
        if(!coupon) {
            return res.status(404).json({message: "Kupongia ei löytynyt"}); //kuponkia ei ole olemassa
        }
        //tarkistaa onko kuponkin päivämäärä vanhentunut
        if(coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({message: "Kuponki on vanhentunut"}); //kuponki on vanhentunut
        }
        res.json({
            message: "Kuponki on voimassa",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        })
    } catch (error) {
        console.log("Virhe kuponkicontrollerissa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
};