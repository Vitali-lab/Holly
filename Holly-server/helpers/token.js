import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}
const secret = process.env.JWT_SECRET;

export const generate = (data) => {
  return jwt.sign(data, secret, { expiresIn: "1d" });
};
export const verify = (token) => {
  return jwt.verify(token, secret);
};
