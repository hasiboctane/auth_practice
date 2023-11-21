import { Mongoose, Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    tc: { type: Boolean, required: true }
}, {
    timestamps: true
})

const User = model("User", UserSchema);
export default User;