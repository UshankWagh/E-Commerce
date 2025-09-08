import Items from "../models/itemsModel.js"
import Categories from "../models/categoriesModel.js"

export const getCategoriesController = async (_, res) => {
    try {
        const categories = await Categories.find().sort({ name: 1 }); // -1 will sort in descending order (newest first)
        res.status(200).json(categories);

    } catch (error) {
        console.log("Error in getCategories Controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getFilteredItemsController = async (req, res) => {

    try {
        const { name = null, category = null, priceRange = [0, 100000] } = req.body;

        let filter = {};
        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }
        if (category) {
            filter.category = category;
        }
        filter.price = { $gte: priceRange[0], $lte: priceRange[1] };

        const items = await Items.find(filter).populate("category");

        res.status(200).json(items);

    } catch (error) {
        console.log("Error in get Filtered items controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const addNewItemController = async (req, res) => {
    try {
        const { name, desc, imageUrl, price, category } = req.body;

        const item = new Items({ name, description: desc, imageUrl, price, category });

        const newItem = await item.save();
        res.status(201).json(newItem);

    } catch (error) {
        console.log("Error in addNewItem controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateItemController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, desc, imageUrl, price, category } = req.body;

        const updatedItem = await Items.findByIdAndUpdate(id, { name, description: desc, imageUrl, price, category }, { new: true });

        if (!updatedItem) return res.status(404).json({ message: "Item not Found" });

        res.status(200).json(updatedItem);

    } catch (error) {
        console.log("Error in updateItem Controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteItemController = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedItem = await Items.findByIdAndDelete(id);

        if (!deletedItem) return res.status(404).json({ message: "Item not Found" });

        res.status(200).json({ message: "Item deleted succssfully" });

    } catch (error) {
        console.log("Error in deleteItem Controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}