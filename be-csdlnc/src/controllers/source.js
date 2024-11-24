import * as sourceService from "../services/source.js";
export const getAllSource = async (req, res) => {
  try {
    const date = req.params.date;
    const searchDate = req.params.searchDate;
    const sources = await sourceService.getAllSource(searchDate, date);
    return res.status(200).json(sources);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getSourceById = async (req, res) => {
  try {
    const id = req.params.id;
    const date = req.params.date;
    const searchDate = req.params.searchDate;
    if (!id) {
      return res.status(400).json({ message: "Missing source id" });
    }
    const source = await sourceService.getSourceById(id, searchDate, date);
    return res.status(200).json(source);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getSourceByLink = async (req, res) => {
  try {
    const link = req.params.link;
    const date = req.params.date;
    const searchDate = req.params.searchDate;
    if (!link) {
      return res.status(400).json({ message: "Missing link" });
    }
    const source = await sourceService.getSourceByLink(link, searchDate, date);
    return res.status(200).json(source);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const getSourceByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const date = req.params.date;
    const searchDate = req.params.searchDate;
    if (!status) {
      return res.status(400).json({ message: "Missing status" });
    }
    const sources = await sourceService.getSourceByStatus(
      status,
      searchDate,
      date
    );
    return res.status(200).json(sources);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const createSource = async (req, res) => {
  const userId = req.data.id;
  const source = req.body.source;
  try {
    if (!source || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const result = await sourceService.createSource(source);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const editSource = async (req, res) => {
  const userId = req.data.id;
  const { id, source, status } = req.body;
  try {
    if (!id || !source || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (isNaN(id) || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const result = await sourceService.editSource(id, source, status);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
