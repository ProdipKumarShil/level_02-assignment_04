import express, { type Application, type Request, type Response } from 'express'
import cookieParser from 'cookie-parser'
import { notFoundHandler } from './middleware/not-found'

const app: Application = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send("Server is running")
})

app.use(notFoundHandler)

export default app
