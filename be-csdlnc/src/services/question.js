import connection from "../database/configDB.js";
export const getAllQuestion = (date) =>
  new Promise(async (resolve, reject) => {
    try {
      const formattedDate =
        date !== "null" ? new Date(date).toLocaleDateString("en-CA") : null;
      const sql =
        formattedDate !== null
          ? "select * from question where DATE(updated_at) = ?"
          : "select * from question";
      const result = await connection.query(
        sql,
        formattedDate !== null ? [formattedDate] : []
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getQuestionById = (id, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const formattedDate =
        date !== "null" ? new Date(date).toLocaleDateString("en-CA") : null;
      const sql =
        formattedDate !== null
          ? "select * from question where id = ? and DATE(updated_at) = ?"
          : "select * from question where id = ?";
      const result = await connection.query(
        sql,
        formattedDate !== null ? [id, formattedDate] : [id]
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getQuestionBySource = (source, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const formattedDate =
        date !== "null" ? new Date(date).toLocaleDateString("en-CA") : null;
      const sql =
        formattedDate !== null
          ? "select * from question where id_source = ? and DATE(updated_at) = ?"
          : "select * from question where id_source = ?";
      const result = await connection.query(
        sql,
        formattedDate !== null ? [source, formattedDate] : [source]
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getQuestionByContent = (content, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const formattedDate =
        date !== "null" ? new Date(date).toLocaleDateString("en-CA") : null;
      const sql =
        formattedDate !== null
          ? "select * from question where question like concat ('%',?,'%') and DATE(updated_at) = ?"
          : "select * from question where question like concat ('%',?,'%')";
      const result = await connection.query(
        sql,
        formattedDate !== null ? [content, formattedDate] : [content]
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getQuestionByStatus = (status, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const formattedDate =
        date !== "null" ? new Date(date).toLocaleDateString("en-CA") : null;

      const sql =
        formattedDate !== null
          ? "select * from question where (status = 1 and 'active' like concat ('%',?,'%') and DATE(updated_at) = ? ) or (status = 0 and 'inactive' like concat ('%',?,'%') and DATE(updated_at) = ?) "
          : "select * from question where (status = 1 and 'active' like concat ('%',?,'%')) or (status = 0 and 'inactive' like concat ('%',?,'%'))";
      const result = await connection.query(
        sql,
        formattedDate !== null
          ? [status, formattedDate, status, formattedDate]
          : [status, status]
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getQuestionByUser = (userId, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const formattedDate =
        date !== "null" ? new Date(date).toLocaleDateString("en-CA") : null;
      const sql =
        formattedDate !== null
          ? "select * from question where id_user = ? and DATE(updated_at) = ?"
          : "select * from question where id_user = ?";
      const result = await connection.query(
        sql,
        formattedDate !== null ? [userId, formattedDate] : [userId]
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const createQuestion = (userId, sourceId, question) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query(
        "insert into question (question, id_source, id_user, updated_at, status) values ( ?, ?, ?, now(), 0)",
        [question, sourceId, userId]
      );
      // resolve(result[0][0]);
      resolve({
        error: result[0].affectedRows === 1 ? 0 : 1,
        message:
          result[0].affectedRows === 1
            ? "Thêm câu hỏi thành công"
            : "Thêm câu hỏi thất bại",
      });
    } catch (err) {
      console.log(err);
      reject({
        error: 1,
        message: "Thêm câu hỏi thất bại",
      });
    }
  });
export const editQuestion = (id, userId, sourceId, question, status) =>
  new Promise(async (resolve, reject) => {
    try {
      if (status === 1) {
        const [countAnswer] = await connection.query(
          "select count(*) as count from answer where id_question = ?",
          [id]
        );
        if (countAnswer[0].count !== 4) {
          resolve({
            error: 1,
            message: "Số lượng câu trả lời phải bằng 4",
          });
          return;
        }
      }
      const result = await connection.query(
        "update question set question = ?, id_source = ?, id_user = ?, updated_at = now(), status = ? where id = ?",
        [question, sourceId, userId, status, id]
      );
      // resolve(result[0][0]);
      resolve({
        error: result[0].affectedRows === 1 ? 0 : 1,
        message:
          result[0].affectedRows === 1
            ? "Sửa câu hỏi thành công"
            : "Sửa câu hỏi thất bại",
      });
    } catch (err) {
      console.log(err);
      reject({
        error: 1,
        message: "Sửa câu hỏi thất bại",
      });
    }
  });
export const getAllQuestionsAndAnswers = () =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query(`SELECT 
    q.id,question,
    GROUP_CONCAT( JSON_OBJECT('answer', answer, 'correct', correct)) AS answers
FROM question q join answer a on q.id = a.id_question
where q.status = 1
GROUP BY id;`);
      const data = result[0].map((item) => {
        return {
          ...item,
          answers: JSON.parse(`[${item.answers}]`),
        };
      });
      resolve(data);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
