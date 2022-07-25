import { check } from "express-validator";
import User from "../../models/User.js";

export const regValidator = [
    check("fullName")
        .not()
        .isEmpty()
        .withMessage("full name is required !")
        .trim(),
    check("mail")
        .custom(async (mail) => {
            const find = await User.findOne({ mail });
            if (find) {
                return Promise.reject("E-mail already in use");
            }
        })
        .not()
        .isEmpty()
        .withMessage("mail is required !")
        .isEmail()
        .withMessage("you main is not valid")
        .trim(),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password is required !")
        .isLength({ min: 4 })
        .withMessage("password must be of minimum 4 characters length")
        .trim(),
];

export const loginValidator = [
    check("mail")
        .not()
        .isEmpty()
        .withMessage("mail is required !")
        .isEmail()
        .withMessage("you main is not valid")
        .trim(),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password is required !")
        .trim(),
];
