import * as questionService from "../services/question.js";
export const getAllQuestion = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestion();
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getQuestionById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Missing question id" });
    }
    const question = await questionService.getQuestionById(id);
    return res.status(200).json(question);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getQuestionBySource = async (req, res) => {
  try {
    const source = req.params.source;
    if (!source) {
      return res.status(400).json({ message: "Missing source" });
    }
    const questions = await questionService.getQuestionBySource(source);
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getQuestionByContent = async (req, res) => {
  try {
    const content = req.params.content;
    if (!content) {
      return res.status(400).json({ message: "Missing content" });
    }
    const questions = await questionService.getQuestionByContent(content);
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getQuestionByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    if (!status) {
      return res.status(400).json({ message: "Missing status" });
    }
    const questions = await questionService.getQuestionByStatus(status);
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getQuestionByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const questions = await questionService.getQuestionByUser(userId);
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
