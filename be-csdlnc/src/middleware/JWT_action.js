import jwt from "jsonwebtoken";
import { get_publicKey } from "../services/user.js";
export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (token == null) {
      return res.status(401).json({ code: 2, message: "Token is missing" });
    }
    const getPublicKey = await get_publicKey(token);
    if (getPublicKey.error === 1) {
      return res.status(401).json({ code: 2, message: "Token is invalid" });
    }
    jwt.verify(token, getPublicKey.publicKey, (err, data) => {
      if (err) {
        return res.status(401).json({ code: 2, message: "Token is invalid" });
      }
      req.data = data;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ code: 2, message: "Token is invalid" });
  }
};
