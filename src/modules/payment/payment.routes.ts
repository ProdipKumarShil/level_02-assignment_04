import { Router } from "express";
// import { createPaymentSessionController } from "./payment.controller";
import auth from "../../middleware/auth";
import { checkoutController } from "./payment.controller";

const paymentRouter = Router()

// paymentRouter.get('/')
paymentRouter.post('/create', auth('CUSTOMER'), checkoutController)
// paymentRouter.post('/checkout:id', auth('CUSTOMER'), checkoutController)

export default paymentRouter
