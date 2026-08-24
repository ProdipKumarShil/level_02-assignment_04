import { Router } from "express";
import { currentUser, login, register } from "./auth.controller";

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/me', currentUser)

export default authRouter
