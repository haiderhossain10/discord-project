import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
    name: "channelSlice",
    initialState: {
        channel: [],
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
    },
});

export const { initChannelData, addNewChannel, addNewMsg } =
    channelSlice.actions;
export default channelSlice.reducer;
