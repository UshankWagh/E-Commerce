import express from "express";
import { addToCartController, deleteCartItemController, getCartController, updateQuantityController } from "../controllers/cartItemsController.js";

const router = express.Router();

router.get("/:customerId", getCartController);

router.post("/:customerId", addToCartController);

router.patch("/:id", updateQuantityController);

router.delete("/:id", deleteCartItemController);

export default router;