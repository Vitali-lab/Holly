import express from "express";
import dotenv from "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { productRouter } from "./routes/productRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { seasonRouter } from "./routes/seasonRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";
import { createUploadRoutes } from "./routes/uploadRoutes.js";
import { widgetsRouter } from "./routes/widgetsRouter.js";

const port = 3005;
const app = express();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

app.use("/", createUploadRoutes({ rootDir: __dirname, uploadsDir }));
app.use("/", productRouter);
app.use("/", userRouter);
app.use("/", seasonRouter);
app.use("/", categoryRouter);
app.use("/", orderRouter);
app.use("/", widgetsRouter);

mongoose
  .connect("mongodb://vitali:mongopass@localhost:27017/")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
