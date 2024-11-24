import * as authService from "../services/auth.js";
import { updateToken, get_publicKey } from "../services/user.js";
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
        name: user.name,
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
export const logout = async (req, res) => {
  const id = req.data.id;
  try {
    const result = await authService.logout(id);
    return res.clearCookie("token").status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
export const checkLogin = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({
        error: 1,
      });
    }
    const result = await get_publicKey(token);
    if (result.error === 1) {
      return res.status(200).json({
        error: 1, 
      });
    }
    jwt.verify(token, result.publicKey, (err, data) => {
      if (err) {
        return res.status(200).json({
          error: 1,
        });
      }
      return res.status(200).json({
        error: 0,
        name: data.name
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 1,
    });
  }
};
