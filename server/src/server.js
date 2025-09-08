import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usersRoutes from "./routes/usersRoutes.js";
import itemsRoutes from "./routes/itemsRoutes.js";
import cartItemsRoutes from "./routes/cartItemsRoutes.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5001;

app.use(cors({
    origin: "https://e-commerce-usw.vercel.app"
}));
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/cartItems", cartItemsRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT);
    });
});