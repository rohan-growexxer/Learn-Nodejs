import express from "express";
const router = express.Router();
import { register, login } from '../controller/auth.js';


/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Register user.
 *     produces: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "Abc"
 *                 email:
 *                   type: string
 *                   example: "Abc@gmail.com"
 *                 password:
 *                   type: string
 *                   example: "ABC@123#"
 *                 country:
 *                   type: string
 *                   example: "India"
 *                 phone:
 *                   type: number
 *                   exmaple: 0
 *     responses:
 *       200:
 *         description: User Created Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.post("/register", register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Login user.
 *     produces: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "Abc"
 *                 password:
 *                    type: string
 *                    example: "abc@123#"
 *     responses:
 *       200:
 *         description: User Created Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.post("/login", login);


export default router;