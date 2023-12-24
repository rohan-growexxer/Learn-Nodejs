import express from "express";
const router = express.Router();

import { updateUser, deleteUser, getUser, getAllUsers } from "../controller/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";


router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, getAllUsers);

export default router;