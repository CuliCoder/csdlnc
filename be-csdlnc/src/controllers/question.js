import * as questionService from "../services/question.js";
export const getAllQuestion = async (req, res) => {
  try {
    const date = req.params.date;
    const questions = await questionService.getAllQuestion(date);
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getQuestionById = async (req, res) => {
  try {
    const id = req.params.id;
    const date = req.params.date;
    console.log(date);
    if (!id) {
      return res.status(400).json({ message: "Missing question id" });
    }
    const question = await questionService.getQuestionById(id, date);
    return res.status(200).json(question);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getQuestionBySource = async (req, res) => {
  try {
    const source = req.params.source;
    const date = req.params.date;
    if (!source) {
      return res.status(400).json({ message: "Missing source" });
    }
    const questions = await questionService.getQuestionBySource(source, date);
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getQuestionByContent = async (req, res) => {
  try {
    const content = req.params.content;
    const date = req.params.date;
    if (!content) {
      return res.status(400).json({ message: "Missing content" });
    }
    const questions = await questionService.getQuestionByContent(content, date);
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getQuestionByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const date = req.params.date;
    console.log(date);
    if (!status) {
      return res.status(400).json({ message: "Missing status" });
    }
    const questions = await questionService.getQuestionByStatus(status, date);
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getQuestionByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const date = req.params.date;
    if (!userId) {
      return res.status(400).json({ message: "Missing user id" });
    }
    const questions = await questionService.getQuestionByUser(userId, date);
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const createQuestion = async (req, res) => {
  try {
    const userId = req.data.id;
    const { question, source } = req.body;
    if (!question || !source || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (isNaN(source)) {
      return res.status(400).json({ message: "Source must be a number" });
    }
    const newQuestion = await questionService.createQuestion(
      userId,
      parseInt(source),
      question
    );
    return res.status(200).json(newQuestion);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const editQuestion = async (req, res) => {
  try {
    const userId = req.data.id;
    const { question, source, id, status } = req.body;
    if (!question || !source || !userId || !id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (isNaN(source) || isNaN(id) || isNaN(status)) {
      return res
        .status(400)
        .json({ message: "Source, id and status must be a number" });
    }
    const updatedQuestion = await questionService.editQuestion(
      id,
      userId,
      parseInt(source),
      question,
      parseInt(status)
    );
    return res.status(200).json(updatedQuestion);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getAllQuestionsAndAnswers = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestionsAndAnswers();
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
