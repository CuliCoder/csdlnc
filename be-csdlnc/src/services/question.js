import connection from "../database/configDB.js";
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
export const getQuestionById = (id) => 
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getQuestionById(?)", [id]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });

