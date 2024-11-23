import connection from "../database/configDB.js";
export const updateToken = (id, token, publicKey) =>
  new Promise(async (resolve, reject) => {
    try {
      // const result = await connection.query("call updateToken(?,?,?)", [
      //   id,
      //   token,
      //   publicKey,
      // ]);
      const result = await connection.query(
        "update user set token = ?, publicKey = ? where id = ?",
        [token, publicKey, id]
      );
      resolve({
        error: result[0].affectedRows === 1 ? "0" : "1",
      });
    } catch (err) {
      console.log(err);
      reject({
        error: "1",
      });
    }
  });

export const get_publicKey = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      // const result = await connection.query("call getPublicKey(?)", [token]);
      // console.log(result[0][0]);
      const result = await connection.query(
        "select publicKey from user where token = ?",
        [token]
      );
      resolve({
        error: result[0].length === 0 ? "1" : "0",
        publicKey: result[0].length === 0 ? "" : result[0][0].publicKey,
      });
    } catch (err) {
      console.log(err);
      reject({
        error: "1",
      });
    }
  });
