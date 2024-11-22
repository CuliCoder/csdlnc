import * as questionService from "../services/question.js";
export const getAllQuestion = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestion();
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }
    const result = await questionService.register(name, username, password);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
