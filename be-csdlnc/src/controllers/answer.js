import * as answerService from "../services/answer.js";
export const getAllAnswer = async (req, res) => {
  try {
    const answers = await answerService.getAllAnswer();
    return res.status(200).json(answers);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getAnswerById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const answer = await answerService.getAnswerById(id);
    return res.status(200).json(answer);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getAnswerByQuestionId = async (req, res) => {
  const { questionId } = req.params;
  try {
    if (!questionId) {
      return res.status(400).json({ message: "QuestionId is required" });
    }
    const answer = await answerService.getAnswerByQuestionId(questionId);
    return res.status(200).json(answer);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getAnswerByContent = async (req, res) => {
  const { content } = req.params;
  try {
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const answer = await answerService.getAnswerByContent(content);
    return res.status(200).json(answer);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getAnswerByCorrect = async (req, res) => {
  const { correct } = req.params;
  try {
    if (!correct) {
      return res.status(400).json({ message: "Correct is required" });
    }
    const answer = await answerService.getAnswerByCorrect(correct);
    return res.status(200).json(answer);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const createAnswer = async (req, res) => {
  const userId = req.data.id;
  const { questionId, answer, correct } = req.body;
  try {
    if (!questionId || !answer || !correct || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (isNaN(questionId) || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const result = await answerService.createAnswer(
      answer,
      questionId,
      correct,
      userId
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const editAnswer = async (req, res) => {
  const userId = req.data.id;
  const { id, questionId, answer, correct } = req.body;
  try {
    if (!id || !questionId || !answer || !correct || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (isNaN(id) || isNaN(questionId) || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const result = await answerService.editAnswer(
      id,
      answer,
      correct,
      userId,
      questionId
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const deleteAnswer = async (req, res) => {
  const userId = req.data.id;
  const questionId = req.body.questionId;
  const id = req.params.id;
  try {
    if (!id || !userId || !questionId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (isNaN(id) || isNaN(userId) || isNaN(questionId)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const result = await answerService.deleteAnswer(id, userId, questionId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
