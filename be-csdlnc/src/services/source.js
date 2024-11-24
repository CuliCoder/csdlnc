import connection from "../database/configDB.js";
export const getAllSource = (searchDate, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const formattedDate =
        date !== "null" && searchDate !== "null"
          ? new Date(date).toLocaleDateString("en-CA")
          : null;
      const sql =
        formattedDate !== null
          ? `select * from source where DATE(${searchDate}) = ?`
          : "select * from source";
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
export const getSourceById = (id, searchDate, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const formattedDate =
        date !== "null" && searchDate !== "null"
          ? new Date(date).toLocaleDateString("en-CA")
          : null;
      const sql =
        formattedDate !== null
          ? `select * from source where id = ? and DATE(${searchDate}) = ?`
          : "select * from source where id = ?";
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
export const getSourceByLink = (Link, searchDate, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const formattedDate =
        date !== "null" && searchDate !== "null"
          ? new Date(date).toLocaleDateString("en-CA")
          : null;
      const sql =
        formattedDate !== null
          ? `select * from source where link like concat ('%',?,'%') and DATE(${searchDate}) = ?`
          : "select * from source where link like concat ('%',?,'%')";
      const result = await connection.query(
        sql,
        formattedDate !== null ? [Link, formattedDate] : [Link]
      );
      // resolve(result[0][0]);
      resolve(result[0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getSourceByStatus = (status, searchDate, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const formattedDate =
        date !== "null" && searchDate !== "null"
          ? new Date(date).toLocaleDateString("en-CA")
          : null;
      const sql =
        formattedDate !== null
          ? `select * from source where (status = 1 and 'active' like concat ('%',?,'%') and DATE(${searchDate}) = ? ) or (status = 0 and 'inactive' like concat ('%',?,'%') and DATE(${searchDate}) = ?)`
          : "select * from source where (status = 1 and 'active' like concat ('%',?,'%')) or (status = 0 and 'inactive' like concat ('%',?,'%'))";
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
export const createSource = (source) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.execute(
        "insert into source ( link, created_at, updated_at) values (?,now(),now())",
        [source]
      );
      resolve({
        error: result[0].affectedRows === 1 ? 0 : 1,
        message:
          result[0].affectedRows === 1
            ? "Thêm nguồn thành công"
            : "Thêm nguồn thất bại",
      });
    } catch (err) {
      console.log(err);
      reject({
        error: 1,
        message: "Thêm nguồn thất bại",
      });
    }
  });
export const editSource = (id, source, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.execute(
        "update source set link = ?, status = ? where id = ?",
        [source, status, id]
      );
      resolve({
        error: result[0].affectedRows === 1 ? 0 : 1,
        message:
          result[0].affectedRows === 1
            ? "Sửa nguồn thành công"
            : "Sửa nguồn thất bại",
      });
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: "Sửa nguồn thất bại",
      });
    }
  });
