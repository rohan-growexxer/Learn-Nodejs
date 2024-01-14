import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

export const createHotel = async (req, res, next) => {
    const createHotel = new Hotel(req.body);

    try {
        const saveHotel = await createHotel.save();
        res.json({
            hasError: false,
            status: 200,
            message: "Hotel Created Successfully!!"
        });
    } catch (error) {
        next(error)
    }
}

export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;

    try {
        if (req.cookies.User === 'jenish') {
            const hotels = await Hotel.find({
                ...others,
                cheapestPrice: { $gt: min | 1, $lt: max || 99999 }
            }).limit(req.query.limit);

            res.json({
                hasError: false,
                status: 200,
                data: hotels
            });
        } else {
            return next(createError(403, "Your are not Authorized!!"));
        }
    } catch (error) {
        next(error);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");

    try {
        const list = await Promise.all(
            cities.amp((city) => {
                return Hotel.countDocuments({ city: city })
            })
        )
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}