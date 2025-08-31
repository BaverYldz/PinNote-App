import { Router } from "express";
import { createNote, getUserNotes, getByIdNote, getAllNotes, updateNote, deleteNote } from "../controllers/note.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const noteRouter = Router();

noteRouter.get('/', authMiddleware, getAllNotes);

noteRouter.get('/:id', authMiddleware, getByIdNote);

noteRouter.post('/', authMiddleware, createNote);

noteRouter.put('/:id', authMiddleware, updateNote)

noteRouter.delete('/:id', authMiddleware, deleteNote)

noteRouter.get('/user/:id', authMiddleware, getUserNotes);

export default noteRouter;