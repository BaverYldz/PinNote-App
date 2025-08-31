import { Router } from "express";
import { getUsers, getUser, updateUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get('/', authMiddleware, getUsers)

userRouter.get('/:id', authMiddleware, getUser)

userRouter.put('/:id', authMiddleware, updateUser)

userRouter.delete('/', (req, res) => { res.send('DELETE User'); })

export default userRouter;

