import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema(
    {
        channelName: String,
        channelCreatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        joined: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        chat: [
            {
                msg: String,
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                data: {
                    type: Date,
                    default: new Date().toLocaleString(),
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Channel", ChannelSchema);
