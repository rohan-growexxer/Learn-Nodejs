import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

import { createError } from '../utils/error.js';

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const saveRoom = await newRoom.save();

        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: saveRoom._id }
            });
            res.json({
                hasError: false,
                status: 200,
                message: "Hotel Created Successfully!!"
            });
        } catch (error) {
            next(error)
        }

    } catch (error) {
        next(error)
    }
}

export const updateRoomAvailabilty = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        await Room.updateOne(
            { "roomNumber._id": req.params.id },
            {
                $push: {
                    "roomNumber.$.unavailableDates": req.body.dates
                }
            }
        )
        res.json({
            hasError: false,
            status: 200,
            message: "Room Status Has Been Updated!!"
        });

    } catch (error) {
        next(error)
    }
}