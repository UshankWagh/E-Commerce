import express from "express";
import { getUserController, loginController, singUpController } from "../controllers/usersController.js";

const router = express.Router();

router.get("/:id", getUserController);

router.post("/signup", singUpController);

router.post("/login", loginController);

export default router;