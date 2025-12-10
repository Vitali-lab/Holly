import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET || "default-jwt-secret-for-development";

export const generate = (data) => {
  return jwt.sign(data, secret, { expiresIn: "1d" });
};
export const verify = (token) => {
  return jwt.verify(token, secret);
};
