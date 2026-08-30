import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import type { UserJwtPayload } from "../../utils/jwt";

export async function getAllTechniciansService() {
  const result = await prisma.user.findMany({
    where: {
      role: "TECHNICIAN"
    },
    omit: {
      password: true
    },
    include: {
      technicianProfile: {
        omit: {
          user_id: true
        }
      }
    }
  })
  return result
}

export async function getTechnicianByIdService(technicianId: string) {
  const technician = await prisma.user.findFirst({
    where: {
      technicianProfile: {
        technicianId: technicianId
      }
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: {
        omit: {
          user_id: true
        }
      }
    }
  })

  if (!technician) {
    throw new AppError(404, "Technician not found")
  }

  return technician
}

export async function updateTechnicianProfile(user: UserJwtPayload, data) {
  const isExist = await prisma.technicianProfile.findFirst({
    where: {
      user_id: user.id
    }
  })

  if (!isExist) {
    throw new AppError(404, "Technician profile not found")
  }

  const updatedProfile = await prisma.user.update({
    where: {
      userId: user.id
    },
    data: {
      technicianProfile: {
        update: {
          ...data
        }
      }
    },
    include: {
      technicianProfile: true
    },
    omit: {
      password: true
    }
  })

  return updatedProfile
}

export async function updateAvailabilityService(user: UserJwtPayload, data: boolean){
  const isExist = await prisma.technicianProfile.findFirst({
    where: {
      user_id: user.id
    }
  })

  if (!isExist) {
    throw new AppError(404, "Technician profile not found")
  }

  const updatedAvailability = await prisma.technicianProfile.update({
    where: {
      user_id: user.id
    },
    data: {
      isAvailable: data
    }
  })

  return updatedAvailability

}
