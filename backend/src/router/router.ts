import { Router } from "express";
import { read, create, remove, index } from "../resources/user/user.controller";

const router = Router();

router.get("/users/list/:db", index);
router.get("/users/:email", read);
router.post("/users/:db", create);
router.delete("/users/:db", remove);

export default router;
