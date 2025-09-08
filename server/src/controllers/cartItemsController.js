import CartItems from "../models/cartItemsModel.js";
import mongoose, { Types } from "mongoose";

export const getCartController = async (req, res) => {
    try {
        const customerId = req.params.customerId;

        const cartItems = await CartItems.find({ customerId }).populate("item");

        if (!cartItems) return res.status(404).json({ message: "No Cart Items found" });

        res.status(200).json(cartItems);

    } catch (error) {
        console.log("Error in getCart Controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addToCartController = async (req, res) => {
    try {

        // new Item
        // already present item

        const { customerId } = req.params;
        const { itemId } = req.body;

        const cartItem = await CartItems.findOne({ customerId, item: itemId });

        let updatedCartItem;


        if (!cartItem) {
            updatedCartItem = await CartItems.insertOne({ customerId, item: itemId, quantity: 1 });
        }
        else {
            updatedCartItem = await CartItems.updateOne({ customerId, item: itemId }, { $set: { customerId, item: itemId, quantity: cartItem.quantity + 1 } });
        }

        // console.log("cart contr ", customerId, itemId, cartItem, updatedCartItem);

        if (!updatedCartItem) return res.status(404).json({ message: "Cart Item not Found" });

        res.status(200).json(updatedCartItem);

    } catch (error) {
        console.log("Error in addToCart Controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateQuantityController = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const updatedCartItem = await CartItems.findByIdAndUpdate(id, { quantity }, { new: true });

        if (!updatedCartItem) return res.status(404).json({ message: "Cart Item not Found" });

        res.status(200).json(updatedCartItem);
    } catch (error) {
        console.log("Error in updateQuantity Controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteCartItemController = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedCartItem = await CartItems.findByIdAndDelete(id);

        if (!deletedCartItem) return res.status(404).json({ message: "Cart Item not Found" });

        res.status(200).json({ message: "Cart Item deleted succssfully" });

    } catch (error) {
        console.log("Error in deleteCartItem Controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}