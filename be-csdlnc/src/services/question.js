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
export const getQuestionBySource = (source) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getQuestionBySource(?)", [source]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getQuestionByContent = (content) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getQuestionByContent(?)", [content]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getQuestionByStatus = (status) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getQuestionByStatus(?)", [status]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getQuestionByUser = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getQuestionByUser(?)", [userId]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const createQuestion = (question) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call createQuestion(?, ?, ?, ?)", [
        question.source,
        question.content,
        question.status,
        question.userId,
      ]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });