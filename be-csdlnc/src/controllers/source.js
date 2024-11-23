import * as sourceService from '../services/source.js';
export const getAllSource = async (req, res) => {
  try {
    const sources = await sourceService.getAllSource();
    return res.status(200).json(sources);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getSourceById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'Missing source id' });
    }
    const source = await sourceService.getSourceById(id);
    return res.status(200).json(source);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getSourceByLink = async (req, res) => {
  try {
    const link = req.params.link;
    if (!link) {
      return res.status(400).json({ message: 'Missing link' });
    }
    const source = await sourceService.getSourceByLink(link);
    return res.status(200).json(source);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getSourceByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    if (!status) {
      return res.status(400).json({ message: 'Missing status' });
    }
    const sources = await sourceService.getSourceByStatus(status);
    return res.status(200).json(sources);
  } catch (err) {
    return res.status(500).json(err);
  }
};