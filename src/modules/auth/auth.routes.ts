import { Router } from "express";
import { currentUser, login, register } from "./auth.controller";
import auth from "../../middleware/auth";

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/me', auth(), currentUser)

export default authRouter
