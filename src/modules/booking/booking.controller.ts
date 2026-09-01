import { catchAsync } from "../../utils/catch-async";
import type { Request, Response } from "express";
import { createBookingService } from "./booking.service";
import { sendResponse } from "../../utils/send-response";

export const addBookingController = catchAsync(async (req: Request, res: Response) => {
  const booking = await createBookingService(req.user!.id, req.body)

  sendResponse(res, {
    message: "Booking successfully",
    data: booking
  }, 201)
});
