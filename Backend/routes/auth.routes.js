import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

// authRouter.post('/log-out', (req, res) => { res.send('Login endpoint'); })  Burayi frontta yapmak daha iyi gibi

export default authRouter;  