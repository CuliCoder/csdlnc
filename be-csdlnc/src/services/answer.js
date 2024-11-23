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
export const getAnswerById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getAnswerById(?)", [id]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getAnswerByQuestionId = (questionId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getAnswerByQuestionId(?)", [
        questionId,
      ]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getAnswerByContent = (content) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getAnswerByContent(?)", [
        content,
      ]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getAnswerByCorrect = (correct) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getAnswerByCorrect(?)", [
        correct,
      ]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
