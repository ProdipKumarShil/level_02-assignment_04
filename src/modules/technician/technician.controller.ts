import type { Request, Response } from 'express';
import { catchAsync } from "../../utils/catch-async";
import { updateTechnicianProfile } from "./technician.service";
import { verifyAccessToken } from '../../utils/jwt';


export const editTechnicianProfile = catchAsync(async(req: Request, res: Response) => {
  const user = await req.user
  const data = await req.body
  
  // const updatedTechnician = await updateTechnicianProfile(user, technicianEmail, data)
  updateTechnicianProfile(user, data)
})
