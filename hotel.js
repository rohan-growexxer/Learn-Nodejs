import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

export const createHotel = async (req, res, next) => {
    const createHotel = new Hotel(req.body);

    try {
        if (req.cookies.User === 'jenish') {
            const saveHotel = await createHotel.save();
            res.json({
                hasError: false,
                status: 200,
                message: "Hotel Created Successfully!!"
            });
        } else {
            return next(createError(403, "Your are not Authorized!!"));
        }
    } catch (error) {
        next(error)
    }
}

export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;

    try {
        let getAllHotelDetails = [];
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 99999 }
        }).limit(req.query.limit);

        hotels.forEach(hoteldetail => {
            getAllHotelDetails.push({
                "name": hoteldetail.name,
                "type": hoteldetail.type,
                "country": hoteldetail.country,
                "address": hoteldetail.address,
                "city": hoteldetail.city,
                "distance": hoteldetail.distance,
                "title": hoteldetail.title,
                "desc": hoteldetail.desc,
                "romms": hoteldetail.rooms,
                "cheapestPrice": hoteldetail.cheapestPrice,
                "featured": hoteldetail.featured
            })
        });

        res.json({
            hasError: false,
            status: 200,
            data: [getAllHotelDetails],
            count: getAllHotelDetails.length
        });

    } catch (error) {
        next(error);
    }
}

export const countByCity = async (req, res, next) => {

    const cities = req.query.cities.split(",");
    try {
        const cityLists = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city })
            })
        )
        res.json({
            hasError: false,
            status: 200,
            data: cityLists
        });
    } catch (error) {
        next(error);
    }
}

export const countByHotelType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villageCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        let hotelCountData = [
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "village", count: villageCount },
            { type: "cabin", count: cabinCount }
        ]
        res.json({
            hasError: false,
            status: 200,
            data: hotelCountData
        });
    } catch (error) {
        next(error);
    }
}

export const getHotelRooms = async (req, res, next) => {

    try {
        const hotelRoom = await Hotel.findById(req.params.id);

        const roomList = await Promise.all(
            hotelRoom.rooms.map((room) => {
                return Room.findById(room);
            })
        )
        res.json({
            hasError: false,
            status: 200,
            data: roomList
        });
    } catch (error) {
        next(error);
    }
}

