import connection from "../database/configDB.js";
export const getAllQuestion = () =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.query("SELECT * FROM question");
      resolve(result);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
