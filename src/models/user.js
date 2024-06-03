import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        firstName:      String,
        lastName:       String,
        username:       String,
        password:       String,
        major:          String,
        plan:           String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;