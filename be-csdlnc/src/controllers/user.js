import * as userService from "../services/user.js";
export const getAllUser = async (req, res) => {
  try {
    const id = req.data.id;
    if (!id) {
      return res.status(400).json({ message: "Missing user id" });
    }
    const users = await userService.getAllUser();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};
