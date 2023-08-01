import mongoose from "mongoose";
// import encrypt from "mongoose-encryption"
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["Password"] });

export default mongoose.model("User", userSchema)
