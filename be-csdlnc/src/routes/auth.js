import express from 'express';
import * as authController from "../controllers/auth.js";
const routeAuth = express.Router();
routeAuth.post("/login", authController.login);
export default routeAuth;