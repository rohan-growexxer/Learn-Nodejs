import express from "express";
const router = express.Router()

import { verifyToken } from "../middlewares/verifyToken.js";
import { createRoom, getAllRoomsForHotel } from "../controller/room.js";

/**
 * @swagger
 * /api/v1/room/createRoom:
 *   post:
 *     tags: ["Rooms"]
 *     summary: Create Room.
 *     produces: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Abc"
 *                 desc:
 *                    type: string
 *                    example: "abc@123#"
 *                 price: 
 *                    type: number
 *                    exmaple: 0
 *                 maxpeople:
 *                    type: number
 *                    exmaple: 0
 *     responses:
 *       200:
 *         description: Create Room Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.post("/createRoom", verifyToken, createRoom);

/**
 * @swagger
 * /api/v1/room/getAllRooms:
 *   get:
 *     tags: ["Rooms"]
 *     summary: Get All Rooms.
 *     responses:
 *       200:
 *         description: Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.get("/getAllRooms", verifyToken, getAllRoomsForHotel)

export default router;