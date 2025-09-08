import mongoose from "mongoose";

// 1 Create a Schema
// 2 Create a model based on that schema

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true } // createdAt, updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;