import type { Request, Response } from 'express';
import { catchAsync } from "../../utils/catch-async";
import { getAllTechniciansService, getTechnicianByIdService, updateAvailabilityService, updateTechnicianProfile } from "./technician.service";
import { sendResponse } from '../../utils/send-response';
import type { UserJwtPayload } from '../../utils/jwt';

export const getAllTechniciansController = catchAsync(async(req: Request, res: Response) => {
  const result = await getAllTechniciansService()
  sendResponse(res, { message: 'Technicians retrieved successfully', data: result })
})

export const getTechnicianByIdController = catchAsync(async(req: Request, res: Response) => {
  const technicianId = req.params.id as string
  const result = await getTechnicianByIdService(technicianId)
  sendResponse(res, {message: "Technician retrieved successfully", data: result})
})

export const editTechnicianProfileController = catchAsync(async(req: Request, res: Response) => {
  const user = req.user
  const data = await req.body
  
  // const updatedTechnician = await updateTechnicianProfile(user, technicianEmail, data)
  const updatedProfile = await updateTechnicianProfile(user, data)
  // console.log(user)
  sendResponse(res, {message: "Technician profile updated successfully", technicianProfile: updatedProfile})
})

export const updateAvailabilityController = catchAsync(async(req: Request, res: Response) => {
  const isAvailable: boolean = req.body.isAvailable
  const jwtUser = req.user
  
  const updateAvailableService = await updateAvailabilityService(jwtUser, isAvailable)
  sendResponse(res, {message: "Technician availability updated successfully", data: updateAvailableService})
})
