import mongoose, { Schema } from "mongoose";

// 1 Create a Schema
// 2 Create a model based on that schema

const itemsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    },
    { timestamps: true } // createdAt, updatedAt
);

const Items = mongoose.model("Item", itemsSchema);

export default Items;