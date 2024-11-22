import connection from "../database/configDB.js";
import bcrypt from "bcrypt";
export const getAllQuestion = () =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getAllQuestions()");
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
export const register = (name, username, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.query(
        "INSERT INTO user (name,username,password) VALUES (?,?,?)",
        [name, username, hashPassword(password)]
      );
      resolve(result);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
