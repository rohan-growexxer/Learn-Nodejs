import express from "express";
const router = express.Router()

import { countByCity, countByHotelType, createHotel, getHotels } from "../controller/hotel.js";
import { verifyToken } from "../middlewares/verifyToken.js";

/**
 * @swagger
 * /api/v1/hotel/createHote:
 *   post:
 *     tags: ["Hotels"]
 *     summary: Register user.
 *     produces: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Abc"
 *                 type:
 *                    type: string
 *                    example: "abc@gmail.com"
 *                 country:
 *                    type: string
 *                    example: "abc@123#"
 *     responses:
 *       200:
 *         description:Hotel Created Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/

router.post("/createHotel", verifyToken, createHotel);

/**
 * @swagger
 * /api/v1/hotel/getAllHotels:
 *   get:
 *     tags: ["Hotels"]
 *     summary: Get All Hotels.
 *     responses:
 *       200:
 *         description: Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.get("/getAllHotels", verifyToken, getHotels);

/**
 * @swagger
 * /api/v1/hotel/getHotelCountByCity:
 *   get:
 *     tags: ["Hotels"]
 *     summary: Get All Hotels Count Base On City.
 *     responses:
 *       200:
 *         description: Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.get("/getHotelCountByCity", verifyToken, countByCity);

/**
 * @swagger
 * /api/v1/hotelcountHotelType:
 *   get:
 *     tags: ["Hotels"]
 *     summary: Get All Hotel Types.
 *     responses:
 *       200:
 *         description: Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.get("/countHotelType", verifyToken, countByHotelType)

export default router;