import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    phoneNumber: String,
    password: String,
    
})

export const User = mongoose.model("User", userSchema)