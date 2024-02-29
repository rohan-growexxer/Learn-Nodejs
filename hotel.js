import express from "express";
const router = express.Router()

import { countByCity, countByHotelType, createHotel, getHotels } from "../controller/hotel.js";
import { verifyToken } from "../middlewares/verifyToken.js";

router.post("/createHotel", verifyToken, createHotel);

/**
 * @swagger
 * /api/v1/hotel/getAllHotels:
 *   get:
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
 *     summary: Get All Hotel Types.
 *     responses:
 *       200:
 *         description: Successfully!!
 *       500:
 *         description: Something Wrong Plz Try Again!!
*/
router.get("/countHotelType", verifyToken, countByHotelType)

export default router;