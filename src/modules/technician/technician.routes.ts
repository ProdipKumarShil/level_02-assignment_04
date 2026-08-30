import { Router } from "express";
import auth from "../../middleware/auth";
import { editTechnicianProfileController, getAllTechniciansController, getTechnicianByIdController, updateAvailabilityController } from "./technician.controller";

const technicianRouter = Router()

technicianRouter.get('/', getAllTechniciansController) // get all technicians
technicianRouter.get('/:id', getTechnicianByIdController) // get a technician by id

technicianRouter.put('/profile', auth("ADMIN", "TECHNICIAN",), editTechnicianProfileController) // update technician profile
technicianRouter.put('/availability', auth("TECHNICIAN"), updateAvailabilityController) // Update Availability Slots
// technicianRouter.get('/bookings') // Get Technician's Bookings
// technicianRouter.patch('/bookings/:id') // Update Booking Status (accept/decline/complete)


export default technicianRouter
