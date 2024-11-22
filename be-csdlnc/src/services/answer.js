import connection from "../database/configDB.js";
export const getAllAnswer = () =>
    new Promise(async (resolve, reject) => {
      try {
        const result = await connection.query("call getAllAnswers()");
        resolve(result[0][0]);
      } catch (err) {
        console.log(err);
        reject(null);
      }
    });
  