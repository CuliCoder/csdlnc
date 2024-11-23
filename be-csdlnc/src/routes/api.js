import express from 'express';
import * as questionController from "../controllers/question.js";
import * as answerController from "../controllers/answer.js";
import * as sourceController from "../controllers/source.js";
const routeAPI = express.Router();
//question
routeAPI.get("/question", questionController.getAllQuestion);
//answer
routeAPI.get("/answer", answerController.getAllAnswer);
routeAPI.get("/answer/id/:id", answerController.getAnswerById);
routeAPI.get("/answer/questionId/:questionId", answerController.getAnswerByQuestionId);
routeAPI.get("/answer/content/:content", answerController.getAnswerByContent);
routeAPI.get("/answer/correct/:correct", answerController.getAnswerByCorrect);
//source
routeAPI.get("/source", sourceController.getAllSource);
export default routeAPI;