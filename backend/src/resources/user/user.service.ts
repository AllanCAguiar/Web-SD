import mysql, { createPool } from "mysql2/promise";
import dotenv from "dotenv";
import { User } from "./user.types";

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
    `SELECT * FROM users WHERE email = '${email}'`,
  );
  const [rows2]: [any[], any] = await mysqlPool2.query(
    `SELECT * FROM users WHERE email = '${email}'`,
  );
  const existsInDb1 = rows1.length > 0;
  const existsInDb2 = rows2.length > 0;
  if (!existsInDb1 && !existsInDb2) return "Usuário não existe em nenhum bd";
  else if (existsInDb1 && !existsInDb2) return "Usuário existe apenas no bd1";
  else if (!existsInDb1 && existsInDb2) return "Usuário existe apenas no bd2";
  else return "Usuário existe em ambos bd";
};

export const createUser = async (name: string, email: string, db: number) => {
  let newUser;
  let pool;

  if (db === 1) {
    pool = mysqlPool1;
  } else if (db === 2) {
    pool = mysqlPool2;
  } else {
    throw new Error("Invalid database selection");
  }

  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const existingUsers = rows as User[];
  if (!existingUsers[0]) {
    const [result] = await pool.execute<mysql.ResultSetHeader>(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
    );
    newUser = { id: result.insertId, name, email };
  }

  return newUser;
};

export const deleteUser = async (email: string, db: number) => {
  let pool: mysql.Pool;

  if (db === 1) {
    pool = mysqlPool1;
  } else if (db === 2) {
    pool = mysqlPool2;
  } else {
    throw new Error("Invalid database selection");
  }

  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  let result;
  if (rows.length !== 0) {
    [result] = await pool.execute<mysql.ResultSetHeader>("DELETE FROM users WHERE email = ?", [
      email,
    ]);
  }

  return result;
};

export default { getUserByEmail, createUser, deleteUser };
