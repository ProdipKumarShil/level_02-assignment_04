import prisma from "../../lib/prisma"
import { AppError } from "../../utils/app-error"

export const createBookingService = async(customerId: string, data: any) => {
  // find service existence
  const serviceId = data.serviceId

  const serviceData = await prisma.service.findUnique({
    where: {
      serviceId: serviceId
    }
  })

  if(!serviceData){
    throw new AppError(404, "Service not found")
  }

  if(!serviceData.isActive){
    throw new AppError(400, "Service not available")
  }

  const bookingDate = new Date(data.bookingDate)

  const overlapping = await prisma.booking.findFirst({
    where: {
      service_id: serviceData.serviceId,
      status: {
        notIn: ["PENDING", "FAILED"]
      },
      bookingDate: bookingDate
    }
  })

  if(overlapping){
    throw new AppError(400, "Service is already booked for this time")
  }

  return prisma.booking.create({
    data: {
      service_id: serviceData.serviceId,
      user_id: customerId,
      technician_id: serviceData.technician_id,
      bookingDate: bookingDate,
      serviceAddress: data.serviceAddress,
      totalAmount: serviceData.price,
      status: "PENDING"
    }
  })

  
}
