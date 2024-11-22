import * as answerService from '../services/answer.js';
export const getAllAnswer = async (req, res) => {
  try {
    const answers = await answerService.getAllAnswer();
    return res.status(200).json(answers);
  } catch (err) {
    return res.status(500).json(err);
  }
};