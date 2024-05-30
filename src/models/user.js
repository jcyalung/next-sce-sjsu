import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;