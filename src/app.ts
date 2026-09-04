import express, { type Application, type Request, type Response } from 'express'
import cookieParser from 'cookie-parser'
import { notFoundHandler } from './middleware/not-found'
import prisma from './lib/prisma'
import authRouter from './modules/auth/auth.routes'
import { globalErrorHandle } from './middleware/global-error'
import technicianRouter from './modules/technician/technician.routes'
import serviceRouter from './modules/service/service.routes'
import adminRouter from './modules/admin/admin.route'
import bookingRouter from './modules/booking/booking.routes'
import paymentRouter from './modules/payment/payment.routes'
import { webhookController } from './modules/payment/payment.controller'

const app: Application = express()

app.post("/payments/webhook", express.raw({type: "application/json"}), webhookController)

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send("Server is running")
})

app.use('/api/auth', authRouter)
app.use('/api/technician', technicianRouter)
app.use('/api/services', serviceRouter)
app.use('/api/admin', adminRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/payments', paymentRouter)

app.use(globalErrorHandle)
app.use(notFoundHandler)

export default app
