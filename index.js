import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cros from "cors";
import morgan from "morgan";
import errorHandler from "./middlewares/handler/errorHandler.js";
import emptyPageHandler from "./middlewares/handler/emptyPageHandler.js";
import authRoute from "./routes/authRoute.js";
import mainRoute from "./routes/mainRoute.js";

const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: process.env.SOCKET_ORIGIN,
    },
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cros());
app.use(morgan("dev"));

// mognodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("mongodb connected!");
    })
    .catch((error) => {
        console.log(error);
    });

// api routes
app.use("/api/v1", authRoute);
app.use("/api/v1", mainRoute);

// socket io

io.on("connection", (socket) => {
    // create channel
    socket.on("create_channel", (data) => {
        io.emit("create_channel", data);
    });

    // send message
    socket.on("msg_send", (data) => {
        io.emit("msg_send", data);
    });
});

// middleware handlers
app.use(errorHandler);
app.use("*", emptyPageHandler);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
