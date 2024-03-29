import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const verifyToken = async (req, res, next) => {
    const token1 = req.headers.cookie.split(';');
    const token = token1[1].replace(" Access-Token=", "");

    if (!token) {
        return next(createError(401, "You are not Authorized!!"));
    }

    jwt.sign(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid!!"))
        }

        req.user = user;
        next();
    });
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Your are not Authorized!!"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Your are not Authorized!!"))
        }
    })
}