import mongoose from "mongoose";

// 1 Create a Schema
// 2 Create a model based on that schema

const CategoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
);

const Categories = mongoose.model("Category", CategoriesSchema);

export default Categories;