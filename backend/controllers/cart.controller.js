import Product from "../models/product.model.js";

// Hakee kirjautuneen käyttäjän ostoskorin tuotteet

export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({ _id: { $in: req.user.cartItems } });

        //lisätään määrä jokaiselle tuotteelle

        const cartItems = products.map(product => {
            const item = req.user.cartItems.find(cartItem => cartItem.id == product.id);
            return {...product.toJSON(),
                quantity: item.quantity}
            });
            
            res.json(cartItems)

    } catch (error) {
        console.log("Virhe ostoskorin tuotteiden haussa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
};

//Tuotteen ostoskoriin lisäämisen funktio

export const addToCart = async (req, res) => {
try {
    const {productId} = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === productId);
    if(existingItem) {
        existingItem.quantity += 1; //määrää kasvatetaan yhdellä
    } else {
        user.cartItems.push(productId); //tuote lisätään ostoskoriin
    }

    await user.save();
    res.json(user.cartItems)


} catch (error) {
    console.log("Virhe tuotteen lisäämisessä ostoskoriin", error.message);
    res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
}

};

//Funktio joka poistaa tuotteet ostoskorista

export const removeAllFromCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;
        
        if (!productId) {
            user.cartItems = []; //koko ostoskori tyhjennetään
        } else {
            user.cartItems = user.cartItems.filter((item) => item.id !== productId); //vain tietty tuote poistetaan
        }
        await user.save();
        res.json(user.cartItems)
    
    } catch (error) {
        console.log("Virhe tuotteiden poistossa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
    
    };

//Tuotteen määrän pävitys ostoskorissa

export const updateQuantity = async (req, res) => {
    try {
        const {id:productId} = req.params; //tuotteen id url parametrinä
        const {quantity} = req.body; //uusi määrä
        const user = req.user;
        const existingItem = user.cartItems.find((item) => item.id === productId);

        if(existingItem) {
            if(quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId); //jos määrä on 0 tuote poistetaan korista
                await user.save();
                return res.json(user.cartItems);
            } 
                
            //määrän päivitys
            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
            
        } else {
            res.status(404).json({message: "Tuotetta ei löydy ostoskorista"});    
        }
    
    } catch (error) {
        console.log("Virhe tuotteiden määrän muuttamisessa", error.message);
        res.status(500).json({ message: "Serveri ei vastaa", error: error.message });
    }
};

