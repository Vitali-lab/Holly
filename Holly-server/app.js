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
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use(express.static(path.join(__dirname, "dist")));
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.use("/uploads", express.static(uploadsDir));

app.use("/", createUploadRoutes({ rootDir: __dirname, uploadsDir }));
app.use("/", productRouter);
app.use("/", userRouter);
app.use("/", seasonRouter);
app.use("/", categoryRouter);
app.use("/", orderRouter);
app.use("/", widgetsRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
