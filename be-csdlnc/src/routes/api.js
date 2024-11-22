import express from 'express';
import * as questionController from "../controllers/question.js";
import * as answerController from "../controllers/answer.js";
import * as sourceController from "../controllers/source.js";
const routeAPI = express.Router();

routeAPI.get("/question", questionController.getAllQuestion);

routeAPI.get("/answer", answerController.getAllAnswer);

routeAPI.get("/source", sourceController.getAllSource);
export default routeAPI;