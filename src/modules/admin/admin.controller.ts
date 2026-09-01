import type { Request, Response } from 'express'
import { createCategoryService, getAllBookingsService, getAllCategoriesService, getAllUsersService, updateUserStatusService } from "./admin.service";
import { sendResponse } from "../../utils/send-response";
import { catchAsync } from '../../utils/catch-async';

export const getAllUsersController = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllUsersService()
  sendResponse(res, {
    message: "Users retrieved successfully",
    data: result
  })
})

export const updateUserStatusController = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const isBanned: boolean = req.body.isBanned

  const result = await updateUserStatusService(id, isBanned)
  sendResponse(res, {
    message: "User status updated successfully",
    data: result
  })
})

export const getAllBookingsController = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllBookingsService()

  sendResponse(res, {
    message: "All bookings retrieved successfully",
    data: result
  })
})

export const getAllCategoriesController = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllCategoriesService()

  sendResponse(res, {
    message: "All categories retrieved successfully",
    data: result
  })
})

export const createCategoryController = catchAsync(async (req: Request, res: Response) => {
  const data = req.body

  const result = await createCategoryService(data)

  sendResponse(res, {
    message: "Category created successfully",
    data: result
  }, 201)
})
