import { configureStore } from "@reduxjs/toolkit";
import channelSlice from "../features/channelSlice";

export default configureStore({
    reducer: {
        channel: channelSlice,
    },
});
