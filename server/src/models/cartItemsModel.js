import mongoose, { Schema } from "mongoose";

// 1 Create a Schema
// 2 Create a model based on that schema

const cartItemsSchema = new mongoose.Schema(
    {
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true } // createdAt, updatedAt
);

const CartItems = mongoose.model("CartItem", cartItemsSchema);

export default CartItems;