import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

import { createError } from '../utils/error.js';

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const saveRoom = await newRoom.save();

        try {
            if (req.cookies.User === 'jenish') {
                await Hotel.findByIdAndUpdate(hotelId, {
                    $push: { rooms: saveRoom._id }
                });
                res.json({
                    hasError: false,
                    status: 200,
                    message: "Room Created Successfully!!"
                });
            } else {
                return next(createError(403, "Your are not Authorized!!"));
            }
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
        if (req.cookies.User === 'jenish') {
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
        } else {
            return next(createError(403, "Your are not Authorized!!"));
        }
    } catch (error) {
        next(error)
    }
}

export const getAllRoomsForHotel = async (req, res, next) => {
    try {
        const hotelRoom = await Room.find();
        const roomList = await Promise.all(
            hotelRoom.map((room) => {
                return Room.findById(room);
            })
        )
        res.json({
            hasError: false,
            status: 200,
            data: roomList,
            count: roomList.length
        });
    } catch (error) {
        next(error);
    }
}