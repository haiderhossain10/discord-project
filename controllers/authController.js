import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";

export const regController = async (req, res) => {
    const { fullName, mail, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        try {
            const hash = await bcrypt.hash(password, 10);
            const create = await User.create({
                fullName,
                mail,
                password: hash,
            });
            res.status(201).json({
                msg: "you have created account!",
                data: create,
            });
        } catch (error) {
            res.status(400).json({
                error: {
                    msg: "something wrong in reg: api",
                },
            });
        }
    }
};

export const loginController = async (req, res) => {
    const { mail, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        try {
            const find = await User.findOne({ mail });
            if (find) {
                const matching = await bcrypt.compare(password, find.password);
                if (matching) {
                    // jwt token
                    const token = jwt.sign(
                        {
                            _id: find._id,
                            fullName: find.fullName,
                            mail: find.mail,
                        },
                        process.env.SECRET_KEY
                    );
                    res.status(200).json({
                        token: token,
                        msg: "you are successfully logged!",
                    });
                } else {
                    res.status(400).json({
                        error: {
                            msg: "you given mail & password doesn't match!",
                        },
                    });
                }
            } else {
                res.status(400).json({
                    error: {
                        msg: "you given mail & password doesn't match!",
                    },
                });
            }
        } catch (error) {
            res.status(400).json({
                error: {
                    msg: "something wrong in reg: api",
                },
            });
        }
    }
};
