import express from 'express';
import * as questionController from "../controllers/question.js";
const routeAPI = express.Router();

routeAPI.get("/question", questionController.getAllQuestion);

export default routeAPI;