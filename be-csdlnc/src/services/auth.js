import connection from "../database/configDB.js";
import bcrypt from "bcrypt";
export const login = (username, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.query("call login(?)", [username]);
      if (result[0].length === 0) {
        resolve({
          error: "1",
          message: "username hoặc password không đúng",
        });
        return;
      }
      if (!bcrypt.compareSync(password, result[0][0].password)) {
        resolve({
          error: "1",
          message: "username hoặc password không đúng",
        });
        return;
      }
      resolve({
        error: "0",
        message: "Đăng nhập thành công",
        id: result[0][0].id,
      });
    } catch (err) {
      console.log(err);
      reject({
        error: "1",
        message: "Đăng nhập không thành công",
      });
    }
  });