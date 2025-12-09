import { Orders } from "../models/Orders.js";

export const getOrders = async () => {
  return await Orders.find();
};

export const addOrder = async (order) => {
  return await Orders.create(order);
};
export const updateOrderStatus = async (id, status) => {
  return await Orders.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true }
  );
};
