import express from "express";
const router = express.Router()

import { verifyToken } from "../middlewares/verifyToken.js";
import { createRoom, getAllRoomsForHotel } from "../controller/room.js";

router.post("/createRoom", verifyToken, createRoom);
router.get("/getAllRooms", verifyToken, getAllRoomsForHotel)

export default router;