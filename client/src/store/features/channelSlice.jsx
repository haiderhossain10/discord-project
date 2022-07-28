import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
    name: "channelSlice",
    initialState: {
        channel: [],
        onlineUser: [],
        users: [],
    },
    reducers: {
        initChannelData: (state, action) => {
            state.channel = action.payload;
        },
        addNewChannel: (state, action) => {
            state.channel = [...state.channel, action.payload];
        },
        addNewMsg: (state, action) => {
            state.channel.map((i) => {
                if (i._id === action.payload.item.channel) {
                    i.chat.push(action.payload.item);
                }
            });
        },
        addOnlineUser: (state, action) => {
            state.onlineUser = action.payload;
        },
        initUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const {
    initChannelData,
    addNewChannel,
    addNewMsg,
    addOnlineUser,
    initUsers,
} = channelSlice.actions;
export default channelSlice.reducer;
