import mongoose from "mongoose";


const SeasonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    

}, { timestamps: true });

export const Season = mongoose.model("Season", SeasonSchema);