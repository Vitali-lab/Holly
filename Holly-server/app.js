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

const port = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://90.156.211.91",
  "http://90.156.211.91:80",
  "http://90.156.211.91:3000",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");
const frontDir = path.join(__dirname, "../Holly-front/dist");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

app.use("/api/uploads", createUploadRoutes({ rootDir: __dirname, uploadsDir }));
app.use("/api/products", productRouter);
app.use("/api", userRouter);
app.use("/api/seasons", seasonRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/widgets", widgetsRouter);

app.use(express.static(path.join(frontDir)));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontDir, "index.html"));
});

console.log(frontDir);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
