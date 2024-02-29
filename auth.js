import express from "express";
const router = express.Router();

import { updateUser, deleteUser, getUser, getAllUsers } from "../controller/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";

/**
 * @swagger
 * /api/v1/users/:{id}:
 *   put:
 *     summary: Update user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *     responses:
 *       200:
 *         description: Update Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.put("/:id", verifyToken, updateUser);

/**
 * @swagger
 * /api/v1/users/:{id}:
 *   delete:
 *     summary: Delete user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *     responses:
 *       200:
 *         description: Deleted Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.delete("/:id", verifyToken, deleteUser);

/**
 * @swagger
 * /api/v1/users/:{id}:
 *   get:
 *     summary: Get Specific User Based On User Id.
 *     responses:
 *       200:
 *         description: Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/

router.get("/:id", verifyToken, getUser);

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     summary: Get All Uers.
 *     responses:
 *       200:
 *         description: Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.get("/", verifyToken, getAllUsers);

export default router;