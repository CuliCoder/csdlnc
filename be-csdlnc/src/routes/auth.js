import express from 'express';
import * as authController from "../controllers/auth.js";
const routeAuth = express.Router();
routeAuth.post("/login", authController.login);
routeAuth.get("/checkLogin", authController.checkLogin);
export default routeAuth;