import express from "express";
import { addNewItemController, deleteItemController, getCategoriesController, getFilteredItemsController, updateItemController } from "../controllers/itemsController.js";

const router = express.Router();

router.get("/categories", getCategoriesController);

router.post("/filtered-items", getFilteredItemsController);

router.post("/", addNewItemController);

router.put("/:id", updateItemController);

router.delete("/:id", deleteItemController);

export default router;