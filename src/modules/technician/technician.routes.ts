import { Router } from "express";
import auth from "../../middleware/auth";
import { editTechnicianProfile } from "./technician.controller";

const technicianRouter = Router()

// technicianRouter.get('/') // get all technicians
// technicianRouter.get('/:id') // get a technician by id

technicianRouter.patch('/profile', auth("ADMIN", "TECHNICIAN"), editTechnicianProfile) // update technician profile
// technicianRouter.put('/availability') // Update Availability Slots
// technicianRouter.get('/bookings') // Get Technician's Bookings
// technicianRouter.patch('/bookings/:id') // Update Booking Status (accept/decline/complete)

export default technicianRouter
