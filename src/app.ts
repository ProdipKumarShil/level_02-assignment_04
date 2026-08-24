import express, { type Application, type Request, type Response } from 'express'
import cookieParser from 'cookie-parser'
import { notFoundHandler } from './middleware/not-found'
import prisma from './lib/prisma'
import authRouter from './modules/auth/auth.routes'
import { globalErrorHandle } from './middleware/global-error'

const app: Application = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send("Server is running")
})

app.use('/api/auth', authRouter)

app.use(globalErrorHandle)
app.use(notFoundHandler)

export default app
