import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: String,
        mail: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", UserSchema);
