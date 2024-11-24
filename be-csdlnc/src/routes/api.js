import express from "express";
import * as questionController from "../controllers/question.js";
import * as answerController from "../controllers/answer.js";
import * as sourceController from "../controllers/source.js";
import * as userController from "../controllers/user.js";
import { authenticateToken } from "../middleware/JWT_action.js";
import { logout } from "../controllers/auth.js";
const routeAPI = express.Router();

//question
routeAPI.get("/question/:date", questionController.getAllQuestion);
routeAPI.get("/question/id/:id/:date", questionController.getQuestionById);
routeAPI.get(
  "/question/sourceId/:source/:date",
  questionController.getQuestionBySource
);
routeAPI.get(
  "/question/content/:content/:date",
  questionController.getQuestionByContent
);
routeAPI.get(
  "/question/status/:status/:date",
  questionController.getQuestionByStatus
);
routeAPI.get("/question/userId/:userId/:date", questionController.getQuestionByUser);
routeAPI.get("/getAllQuestionsAndAnswers", questionController.getAllQuestionsAndAnswers);
//answer
routeAPI.get("/answer", answerController.getAllAnswer);
routeAPI.get("/answer/id/:id", answerController.getAnswerById);
routeAPI.get(
  "/answer/questionId/:questionId",
  answerController.getAnswerByQuestionId
);
routeAPI.get("/answer/content/:content", answerController.getAnswerByContent);
routeAPI.get("/answer/correct/:correct", answerController.getAnswerByCorrect);
//source
routeAPI.get("/source/:searchDate/:date", sourceController.getAllSource);
routeAPI.get("/source/id/:id/:searchDate/:date", sourceController.getSourceById);
routeAPI.get("/source/link/:link/:searchDate/:date", sourceController.getSourceByLink);
routeAPI.get("/source/status/:status/:searchDate/:date", sourceController.getSourceByStatus);

routeAPI.use(authenticateToken);
//logout
routeAPI.post('/logout', logout);
//CRUD
//question
routeAPI.post("/question/create", questionController.createQuestion);
routeAPI.put("/question/edit", questionController.editQuestion);
//answer
routeAPI.post("/answer/create", answerController.createAnswer);
routeAPI.put("/answer/edit", answerController.editAnswer);
routeAPI.put("/answer/delete/:id", answerController.deleteAnswer);
//source
routeAPI.post("/source/create", sourceController.createSource);
routeAPI.put("/source/edit", sourceController.editSource);
//user
routeAPI.get("/user", userController.getAllUser);
export default routeAPI;
