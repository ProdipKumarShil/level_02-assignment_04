import { Router } from "express";
import auth from "../../middleware/auth";
import { addBookingController, getAllBookingController, getBookingByIdController } from "./booking.controller";

const bookingRouter = Router()

bookingRouter.post('/', auth("CUSTOMER"), addBookingController)
bookingRouter.get('/', getAllBookingController)
bookingRouter.get('/:id', getBookingByIdController)

export default bookingRouter
