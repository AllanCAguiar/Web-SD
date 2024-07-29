import { Request, Response } from "express";
import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const mysqlPool1 = createPool({
  host: process.env.MYSQL_HOST_1,
  user: process.env.MYSQL_USER_1,
  password: process.env.MYSQL_PASSWORD_1,
  database: process.env.MYSQL_DATABASE_1,
});

const mysqlPool2 = createPool({
  host: process.env.MYSQL_HOST_2,
  user: process.env.MYSQL_USER_2,
  password: process.env.MYSQL_PASSWORD_2,
  database: process.env.MYSQL_DATABASE_2,
});

export const listUsers = async (db: number) => {
  let result;
  if (db == 1) {
    [result] = await mysqlPool1.query("SELECT * FROM users");
  } else if (db == 2) {
    [result] = await mysqlPool2.query("SELECT * FROM users");
  }
  return result;
};

export const getUserByEmail = async (email: string) => {
  const [rows1]: [any[], any] = await mysqlPool1.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  const [rows2]: [any[], any] = await mysqlPool2.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  const existsInDb1 = rows1.length > 0;
  const existsInDb2 = rows2.length > 0;
  if (!existsInDb1 && !existsInDb2) return "Usuario não existe em nenhum bd";
  else if (existsInDb1 && !existsInDb2) return "Usuario não existe no bd2";
  else if (!existsInDb1 && existsInDb2) return "Usuario não existe no bd1";
  else return "Usuario existe em ambos bd";
};

export const createUser = async (name: string, email: string, db: number) => {
  let newUser;
  if (db == 1) {
    [newUser] = await mysqlPool1.query(
      `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`
    );
  } else if (db == 2) {
    [newUser] = await mysqlPool2.query(
      `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`
    );
  }
  return newUser;
};

export const deleteUser = async (email: string, db: number) => {
  let result;
  if (db == 1) {
    result = await mysqlPool1.query(
      `DELETE FROM users WHERE email = '${email}'`
    );
  } else if (db == 2) {
    result = await mysqlPool2.query(
      `DELETE FROM users WHERE email = '${email}'`
    );
  }
  return result;
};

export default { getUserByEmail, createUser, deleteUser };
