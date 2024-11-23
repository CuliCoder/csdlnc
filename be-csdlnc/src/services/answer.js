import connection from "../database/configDB.js";
export const getAllAnswer = () =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("select * from answer");
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getAnswerById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query(
        "select * from answer where id = ?",
        [id]
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getAnswerByQuestionId = (questionId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query(
        "select * from answer where id_question = ?",
        [questionId]
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getAnswerByContent = (content) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query(
        "select * from answer where answer like concat ('%',?,'%')",
        [content]
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getAnswerByCorrect = (correct) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query(
        "select * from answer where correct = ? ",
        [correct]
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const createAnswer = (answer, questionId, correct, userId) =>
  new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await connection.getConnection();
      await client.beginTransaction();
      const [countAswer] = await client.query(
        "select count(*) as count from answer where id_question = ?",
        [questionId]
      );
      if (countAswer[0].count >= 4) {
        resolve({
          error: 1,
          message: "Số lượng câu trả lời đã đạt giới hạn",
        });
        return;
      }
      const result = await client.execute(
        "insert into answer (answer, id_question, correct) values ( ?, ?, ?) ",
        [answer, questionId, correct]
      );
      if (result[0].affectedRows !== 1) {
        resolve({
          error: 1,
          message: "Thêm câu trả lời thất bại",
        });
        return;
      }
      const [updateEditorId] = await client.execute(
        "update question set id_user = ?, updated_at = now() where id = ?",
        [userId, questionId]
      );
      if (updateEditorId.affectedRows !== 1) {
        resolve({
          error: 1,
          message: "Thêm câu trả lời thất bại",
        });
        await client.rollback();
        return;
      }
      await client.commit();
      resolve({
        error: 0,
        message: "Thêm câu trả lời thành công",
      });
    } catch (err) {
      console.log(err);
      reject({
        error: 1,
        message: "Thêm câu trả lời thất bại",
      });
    } finally {
      if (client) client.release();
    }
  });
