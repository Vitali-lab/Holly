import mongoose from "mongoose";
import { USER } from "../constants/roles.js";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: USER
    },
    favorites: {
        type: Array,
        default: []
    },
     cart: {
    type: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      customId: String,
      size: String,
      count: Number
    }],
    default: []  
  }
    

}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
    