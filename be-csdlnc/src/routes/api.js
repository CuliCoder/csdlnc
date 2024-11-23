import express from 'express';
import * as questionController from "../controllers/question.js";
import * as answerController from "../controllers/answer.js";
import * as sourceController from "../controllers/source.js";
const routeAPI = express.Router();
//question
routeAPI.get("/question", questionController.getAllQuestion);
routeAPI.get("/question/id/:id", questionController.getQuestionById);
routeAPI.get("/question/sourceId/:source", questionController.getQuestionBySource);
routeAPI.get("/question/content/:content", questionController.getQuestionByContent);
routeAPI.get("/question/status/:status", questionController.getQuestionByStatus);
routeAPI.get("/question/userId/:userId", questionController.getQuestionByUser);
//answer
routeAPI.get("/answer", answerController.getAllAnswer);
routeAPI.get("/answer/id/:id", answerController.getAnswerById);
routeAPI.get("/answer/questionId/:questionId", answerController.getAnswerByQuestionId);
routeAPI.get("/answer/content/:content", answerController.getAnswerByContent);
routeAPI.get("/answer/correct/:correct", answerController.getAnswerByCorrect);
//source
routeAPI.get("/source", sourceController.getAllSource);
routeAPI.get("/source/id/:id", sourceController.getSourceById);
routeAPI.get("/source/link/:link", sourceController.getSourceByLink);
routeAPI.get("/source/status/:status", sourceController.getSourceByStatus);
export default routeAPI;