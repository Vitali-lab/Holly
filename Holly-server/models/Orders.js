import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    orderNum: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userSurname: {
      type: String,
      required: true,
    },
    userPatronymic: {
      type: String,
      required: true,
    },
    deliveryMethod: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "created",
    },
    sum: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Orders = mongoose.model("Orders", OrdersSchema);
