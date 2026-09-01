import { catchAsync } from "../../utils/catch-async";
import type { Request, Response } from "express";
import { createBookingService, getAllBookingService, getBookingByIdService } from "./booking.service";
import { sendResponse } from "../../utils/send-response";

export const addBookingController = catchAsync(async (req: Request, res: Response) => {
  const booking = await createBookingService(req.user!.id, req.body)

  sendResponse(res, {
    message: "Booking successfully",
    data: booking
  }, 201)
});

export const getAllBookingController = catchAsync(async(req: Request, res: Response) => {
  const bookingResult = await getAllBookingService()

  sendResponse(res, {
    message: "Booking retrived successfully",
    data: bookingResult
  })
})

export const getBookingByIdController = catchAsync(async(req: Request, res: Response) => {
  const bookingId = req.params.id
  const result = await getBookingByIdService(bookingId as string)

  sendResponse(res, {
    message: "Booking retrived successfully",
    data: result
  })
})
