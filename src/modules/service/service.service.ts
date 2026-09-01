import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import type { UserJwtPayload } from "../../utils/jwt";

export async function createService(user: UserJwtPayload, data: any) {
  const isExist = await prisma.technicianProfile.findFirst({
    where: {
      user_id: user.id
    }
  })

  const categoryExists = await prisma.category.findUnique({
    where: {
      categoryId: data.categoryId
    }
  })

  if (!isExist) {
    throw new AppError(404, "Technician profile not found")
  }

  if (!categoryExists) {
    throw new AppError(404, "Category not found")
  }

  const newService = await prisma.service.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      technician_id: isExist.technicianId,
      category_id: data.categoryId
    },
    include: {
      category: true
    }
  })

  return newService
}

export async function getAllServices(){
  const result = await prisma.service.findMany({
    where: {
      isActive: true
    },
    include: {
      category: true,
      technician: {
        include: {
          user: {
            select: {
              userId: true,
              name: true,
              email: true,
              phone: true
            }
          }
        }
      }
    }
  })

  return result
}
