import * as sourceService from '../services/source.js';
export const getAllSource = async (req, res) => {
  try {
    const sources = await sourceService.getAllSource();
    return res.status(200).json(sources);
  } catch (err) {
    return res.status(500).json(err);
  }
};