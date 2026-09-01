import { Router } from "express";
import { createCategoryController, getAllBookingsController, getAllCategoriesController, getAllUsersController, updateUserStatusController } from "./admin.controller";
import auth from "../../middleware/auth";

const adminRouter = Router()

adminRouter.get('/users', auth("ADMIN"), getAllUsersController)
adminRouter.patch('/users/:id', auth("ADMIN"), updateUserStatusController)
adminRouter.get('/bookings', auth("ADMIN"), getAllBookingsController)
adminRouter.get('/categories', auth("ADMIN"), getAllCategoriesController)
adminRouter.post('/categories', auth("ADMIN"), createCategoryController)

export default adminRouter
