import express, { type Application, type Request, type Response } from 'express'
import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send("Server is running")
})

export default app
