import mongoose from "mongoose";

const UploadImageSchema = new mongoose.Schema({
  title: String,
  content: String,
  imagePath: String,
});

export const UploadImage = mongoose.model("UploadImage", UploadImageSchema);
