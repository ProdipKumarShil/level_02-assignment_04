import { Router } from "express";
import auth from "../../middleware/auth";
import { createServiceController, getAllServicesController } from "./service.controller";

const serviceRouter = Router()

serviceRouter.post('/', auth('TECHNICIAN'), createServiceController)
serviceRouter.get('/', getAllServicesController)

export default serviceRouter
