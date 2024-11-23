import { error } from "console";
import * as authService from "../services/auth.js";
import { updateToken } from "../services/user.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({
        error: "1",
        message: "username hoặc password không được để trống",
      });
    }
    const user = await authService.login(username, password);
    if (user.error === "1") {
      return res.status(200).json(user);
    }
    const { privateKey: private_key_token, publicKey: public_key_token } =
      crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });
    const token = jwt.sign(
      {
        id: user.id,
      },
      private_key_token,
      {
        algorithm: process.env.algorithm_JWT,
        expiresIn: +process.env.expiresIn_JWT,
      }
    );
    const updateTokenResult = await updateToken(
      user.id,
      token,
      public_key_token
    );
    if (updateTokenResult.error === "1") {
      return res.status(200).json({
        error: "1",
        message: "Đăng nhập không thành công",
      });
    }
    return res
      .cookie("token", token, {
        expires: new Date(Date.now() + +process.env.expiresIn_JWT),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        error: user.error,
        message: user.message,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};