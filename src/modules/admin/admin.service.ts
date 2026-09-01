import prisma from "../../lib/prisma"
import { AppError } from "../../utils/app-error"
import type { catetoryData } from "../../utils/types"

export async function getAllUsersService() {
  const users = await prisma.user.findMany({
    omit: {
      password: true
    },
    include: {
      technicianProfile: true
    }
  })

  return users
}

export async function updateUserStatusService(userId: string, isBanned: boolean){
  const isExist = await prisma.user.findUnique({
    where:  {
      userId: userId
    }
  })

  if(!isExist){
    throw new AppError(404, "User not found")
  }

  const updatedUser = await prisma.user.update({
    where: {
      userId: userId
    },
    data: {
      isBanned: isBanned
    },
    omit: {
      password: true
    }
  })
  return updatedUser
}

export async function getAllBookingsService() {
  const bookings = await prisma.booking.findMany({
    include: {
      user: {
        omit: {
          password: true
        }
      },
      service: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return bookings
}

export async function getAllCategoriesService() {
  const categories = await prisma.category.findMany({
    include: {
      services: true
    }
  })

  return categories
}

export async function createCategoryService(data: catetoryData) {
  const isExist = await prisma.category.findFirst({
    where: {
      name: data.name
    }
  })

  if(isExist){
    throw new AppError(400, "Category with this name already exists")
  }

  const result = await prisma.category.create({
    data: {
      name: data.name,
      description: data.description
    }
  })

  return result
}
