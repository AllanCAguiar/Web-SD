import { Request, Response } from "express";
import { createUser, deleteUser, getUserByEmail, listUsers } from "./user.service";

export const index = async (req: Request, res: Response) => {
  const { db } = req.params;
  const mensagem = await listUsers(Number(db));
  res.json(mensagem);
};

export const read = async (req: Request, res: Response) => {
  const { email } = req.params;
  const mensagem = await getUserByEmail(email);
  res.json(mensagem);
};

export const create = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const { db } = req.params;
  const result = await createUser(name, email, Number(db));
  res.json(result);
};

export const remove = async (req: Request, res: Response) => {
  const { email } = req.body;
  const { db } = req.params;
  const removed = await deleteUser(email, Number(db));
  res.json(removed);
};
