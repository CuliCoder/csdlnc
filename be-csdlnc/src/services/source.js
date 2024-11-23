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
export const getSourceById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getSourceById(?)", [id]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getSourceByLink = (Link) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getSourceByLink(?)", [Link]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });
export const getSourceByStatus = (status) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.query("call getSourceByStatus(?)", [status]);
      resolve(result[0][0]);
    } catch (err) {
      console.log(err);
      reject(null);
    }
  });