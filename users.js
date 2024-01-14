import User from '../models/User.js';
import { createError } from '../utils/error.js';
import cookieParser from "cookie-parser";

export const updateUser = async (req, res, next) => {
    try {
        const updateuser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        const updatedUserDetail = {
            _id: updateuser._id,
            username: updateuser.username,
            email: updateuser.email,
            country: updateuser.country,
            phone: updateuser.phone
        }

        res.json({
            hasError: false,
            status: 200,
            data: [updatedUserDetail]
        });
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deleteUser = await User.findByIdAndDelete(
            req.params.id
        );

        res.json({
            hasError: false,
            status: 200,
            message: "User Has Been Deleted Successfully!!"
        });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (user.username === 'jenish') {
            const getSingleUserDetail = {
                _id: user._id,
                username: user.username,
                country: user.country,
            }
            res.json({
                hasError: false,
                status: 200,
                data: getSingleUserDetail
            });
        } else {
            return next(createError(403, "Your are not Authorized!!"));
        }
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        if (req.cookies.User === 'jenish') {
            const users = await User.find();
            let usersData = [];

            for (let i = 0; i < users.length; i++) {
                let getUsersDetail = {
                    _id: users[i]._id,
                    username: users[i].username,
                    country: users[i].country,
                }
                usersData.push(getUsersDetail)
            }

            res.json({
                hasError: false,
                status: 200,
                data: usersData
            });
        } else {
            return next(createError(403, "Your are not Authorized!!"));
        }
    } catch (error) {
        next(error);
    }
}