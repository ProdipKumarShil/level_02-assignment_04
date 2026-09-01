import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { createService, getAllServices } from "./service.service";
import { sendResponse } from "../../utils/send-response";

export const createServiceController = catchAsync(async(req: Request, res: Response) => {
  const user = req.user
  const data = req.body

  const result = await createService(user, data)
  console.log({serviceController: result})
  sendResponse(res, {
    message: "Service created successfully",
    data: result
  }, 201)
})

export const getAllServicesController = catchAsync(async(req, res) => {
  const result = await getAllServices()

  sendResponse(res, {
    message: "Services retrieved successfully",
    data: result
  })
})
