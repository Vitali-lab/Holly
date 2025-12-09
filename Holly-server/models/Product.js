import mongoose from "mongoose";
import validator from "validator";

const ProductSchema = new mongoose.Schema(
  {
    category_id: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => {
          return (
            Array.isArray(arr) &&
            arr.length > 0 &&
            arr.every(
              (item) => typeof item === "string" && item.startsWith("http")
            )
          );
        },
        message:
          "Каждый элемент массива images должен быть корректным URL и массив не может быть пустым",
      },
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: Object,
      required: true,
    },
    rating: {
      overallRating: {
        type: Number,
        required: true,
      },
      users: {
        type: Array,
        required: true,
      },
    },
    season_id: {
      type: String,
      required: true,
    },
    sale: {
      type: Number || null,
      default: null,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
