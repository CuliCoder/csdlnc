import connection from "../database/configDB.js";
export const getAllSource = () =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getAllSources()");
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
