import { Router } from "express";
// import { createPaymentSessionController } from "./payment.controller";
import auth from "../../middleware/auth";
import { checkoutController, getPaymentByIdController, getUserPaymentHistoryController } from "./payment.controller";

const paymentRouter = Router()

// paymentRouter.get('/')
paymentRouter.post('/create', auth('CUSTOMER'), checkoutController)
paymentRouter.get("/", auth("CUSTOMER"), getUserPaymentHistoryController);
paymentRouter.get("/:id", auth("CUSTOMER", "TECHNICIAN", "ADMIN"), getPaymentByIdController);

export default paymentRouter
