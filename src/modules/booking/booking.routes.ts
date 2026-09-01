import { Router } from "express";
import auth from "../../middleware/auth";
import { addBookingController } from "./booking.controller";

const bookingRouter = Router()

bookingRouter.post('/', auth("CUSTOMER"), addBookingController)
// bookingRouter.get('/')
// bookingRouter.get('/:id')

export default bookingRouter
