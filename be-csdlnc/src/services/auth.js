import connection from "../database/configDB.js";
import bcrypt from "bcrypt";
export const login = (username, password) =>
  new Promise(async (resolve, reject) => {
    try {
      // const [result] = await connection.query("call login(?)", [username]);
      const [result] = await connection.query(
        "select id, password from user where username = ?",
        [username]
      );
      if (result.length === 0) {
        resolve({
          error: "1",
          message: "username hoặc password không đúng",
        });
        return;
      }
      if (!bcrypt.compareSync(password, result[0].password)) {
        resolve({
          error: "1",
          message: "username hoặc password không đúng",
        });
        return;
      }
      resolve({
        error: "0",
        message: "Đăng nhập thành công",
        id: result[0].id,
      });
    } catch (err) {
      console.log(err);
      reject({
        error: "1",
        message: "Đăng nhập không thành công",
      });
    }
  });
export const logout = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.execute(
        "update user set token = null, publicKey = null where id = ?",
        [id]
      );
      resolve({
        error: result[0].affectedRows === 1 ? 0 : 1,
        message:
          result[0].affectedRows === 1
            ? "Đăng xuất thành công"
            : "Đăng xuất không thành công",
      });
    } catch (err) {
      console.log(err);
      reject({
        error: 1,
        message: "Đăng xuất không thành công",
      });
    }
  });
