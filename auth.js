import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';
import validator from 'email-validator';

export const register = async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const isValid = validator.validate(userEmail);
        const password = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        if (req.body.username === 'jenish') {
            res.json({
                hasError: true,
                status: 400,
                message: "No need to register you can direct login as you are admin!!"
            });
        }

        if (!isValid) {
            return next(createError(500, "Please Enter Correct Email Address!!"));
        }

        if (password.length < 6) {
            return next(createError(500, "Please Enter Min 6 Character For Password!!"));
        }

        const newUser = new User({
            ...req.body,
            password: hash
        });

        newUser.save();

        res.json({
            hasError: false,
            status: 200,
            message: "User Created Successfully!!"
        });

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return next(createError((500, "User Not Found!!")))
        }

        const isPasswordCorrect = bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return next(createError(500, "Wrong Password And User Name!!"));
        }

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT)

        const { password, isAdmin, ...otherDeatails } = user._doc;

        const loginUserDetail = {
            id: otherDeatails._id,
            username: otherDeatails.username,
            email: otherDeatails.email,
            country: otherDeatails.country,
            phone: otherDeatails.phone
        }

        res.cookie("Access-Token", token, {
            httpOnly: true
        });

        res.cookie("User", user.username)

        res.json({
            hasError: false,
            status: 200,
            data: [{
                loginUserDetail,
                "token": token
            }]
        });
    } catch (error) {
        next(error)
    }
};