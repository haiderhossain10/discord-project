import express from "express";
import {
    channelCreate,
    createChannelMsg,
    findJoinedChannel,
    findUser,
    joinChannel,
} from "../controllers/mainController.js";
const mainRoute = express.Router();

mainRoute.post("/create/channel", channelCreate);
mainRoute.put("/create/join/channel", joinChannel);
mainRoute.get("/find/joined/channel", findJoinedChannel);
mainRoute.put("/create/channel/msg", createChannelMsg);
mainRoute.get("/find/user", findUser);

export default mainRoute;
