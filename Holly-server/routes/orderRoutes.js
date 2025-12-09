import { Router } from "express";

import {
  addOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orders.js";
import { mapOrder } from "../helpers/mapOrder.js";

const router = Router();

router.get("/orders", async (req, res) => {
  const orders = await getOrders();
  res.send({ orders: orders.map(mapOrder) });
});

router.post("/orders", async (req, res) => {
  const newOrder = await addOrder(req.body);
  res.send(newOrder);
});

router.patch("/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await updateOrderStatus(
      req.params.id,
      req.body.status
    );
    if (!updatedOrder) {
      return res.status(404).send({ error: "Order not found" });
    }
    res.send({ order: mapOrder(updatedOrder) });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export const orderRouter = router;
