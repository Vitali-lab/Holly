import mongoose from "mongoose";

const WidgetsSchema = new mongoose.Schema(
  {
    mainText: {
      type: String,
      required: true,
    },
    subText: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Widgets = mongoose.model("Widgets", WidgetsSchema);
