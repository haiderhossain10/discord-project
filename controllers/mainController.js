import Channel from "../models/Channel.js";

export const channelCreate = async (req, res, next) => {
    const { channelName, channelCreatorId } = req.body;
    try {
        const create = await Channel.create({ channelName, channelCreatorId });
        const createdData = await create.populate("channelCreatorId");
        res.status(201).json({
            msg: "you have created channel !",
            data: createdData,
        });
    } catch (error) {
        res.status(401).json({
            error: {
                msg: "something wrong in crate channel: api",
            },
        });
    }
};

export const joinChannel = async (req, res) => {
    try {
        const find = await Channel.find({
            $or: [{ "joined.userId": req.query.userId }],
        });
        if (
            find.length == 0 &&
            find[0]?.channelCreatorId !== req.query.userId
        ) {
            const update = await Channel.updateMany(
                { _id: req.query.channelId },
                { $push: { joined: { userId: req.query.userId } } }
            );
            res.status(201).json({
                msg: "you are joined successfully!",
                data: update,
            });
        } else {
            res.status(400).json({
                error: {
                    msg: "you have already joined !",
                },
            });
        }
    } catch (error) {
        res.status(401).json({
            error: {
                msg: "something wrong in join channel: api",
            },
        });
    }
};

export const findJoinedChannel = async (req, res) => {
    try {
        const find = await Channel.find({
            $or: [
                {
                    channelCreatorId: req.query.userId,
                },
                {
                    "joined.userId": req.query.userId,
                },
            ],
        }).populate([
            {
                path: "channelCreatorId",
            },
            {
                path: "joined",
                populate: {
                    path: "userId",
                    select: "-password",
                },
            },
            {
                path: "chat",
                populate: {
                    path: "userId",
                    select: "-password",
                },
            },
        ]);
        res.status(200).json({
            data: find,
        });
    } catch (error) {
        res.status(401).json({
            error: {
                msg: "something wrong in find joined channel: api",
            },
        });
    }
};

export const createChannelMsg = async (req, res) => {
    try {
        const update = await Channel.updateMany(
            { _id: req.query.channelId },
            { $push: { chat: { msg: req.body.msg, userId: req.query.userId } } }
        );

        if (update) {
            const find = await Channel.find({
                _id: req.query.channelId,
            }).populate([
                { path: "joined", populate: { path: "userId" } },
                {
                    path: "chat",
                    populate: {
                        path: "userId",
                        select: "-password",
                    },
                    populate: {
                        path: "joined",
                        select: "-password",
                    },
                },
            ]);
            res.status(201).json({
                msg: "massage sent!",
                data: find[0],
            });
        } else {
            res.status(401).json({
                error: {
                    msg: "something wrong in create new message: api",
                },
            });
        }
    } catch (error) {
        res.status(401).json({
            error: {
                msg: "something wrong in create new message: api",
            },
        });
    }
};
