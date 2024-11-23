import * as questionService from "../services/question.js";
export const getAllQuestion = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestion();
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};

