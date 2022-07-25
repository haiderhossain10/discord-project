import express from "express";
import {
    loginController,
    regController,
} from "../controllers/authController.js";
import {
    loginValidator,
    regValidator,
} from "../middlewares/validator/authValidator.js";
const authRoute = express.Router();

authRoute.post("/reg", regValidator, regController);
authRoute.post("/login", loginValidator, loginController);

export default authRoute;
