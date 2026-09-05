import { catchAsync } from "../../utils/catch-async";
import type { Request, Response } from "express"
// import { createPaymentSessionService } from "./payment.service";
import { sendResponse } from "../../utils/send-response";
import { AppError } from "../../utils/app-error";
import type Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import config from "../../config";
import { checkoutSessionService, completePaymentService, getPaymentByIdService, getUserPaymentService } from "./payment.service";
import prisma from "../../lib/prisma";

export const webhookController = catchAsync(async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature']

  if (!signature) {
    throw new AppError(400, "Missing stripe-signature Header")
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      config.STRIPE_WEBHOOK as string
    )
  } catch (error) {
    throw new AppError(400, "Invalid webhook signature")
  }

  const session = event.data.object as {id: string, metadata?: {bookingId: string}}
  const bookingId = session.metadata?.bookingId
  
  if(bookingId){
    if(event.type === "checkout.session.completed"){
      await completePaymentService(bookingId, session.id)
    } else if(event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed"){
      await prisma.payment.updateMany({
        where: {booking_id: bookingId, status: "PENDING"},
        data: {status: "FAILED"}
      })
    }
  }

  res.json({received: true})
  
})

export const checkoutController = catchAsync(async(req: Request, res: Response) => {
  const {bookingId} = req.body
  const customerId = req.user?.id

  const result = await checkoutSessionService(customerId, bookingId)
  sendResponse(res, {
    message: "Checkout session created successfully",
    data: result
  })
})

export const getUserPaymentHistoryController = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await getUserPaymentService(userId);
  sendResponse(res, {
    message: "Payment history retrieved successfully",
    data: result
  })
});

export const getPaymentByIdController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const userRole = req.user!.role;

  const result = await getPaymentByIdService(userId, userRole, id as string);

  sendResponse(res, {
    message: "Payment history retrieved successfully",
    data: result
  })
});

