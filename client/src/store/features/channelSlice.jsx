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
            const mainState = state.channel.map((item) => {
                if (item._d === action.payload.id) {
                    item.chat.push(action.payload.item);
                    return item;
                }
            });
            state.channel = mainState;
        },
    },
});

export const { initChannelData, addNewChannel, addNewMsg } =
    channelSlice.actions;
export default channelSlice.reducer;
