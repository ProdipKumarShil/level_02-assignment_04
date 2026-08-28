import prisma from "../../lib/prisma";
import type { UserJwtPayload } from "../../utils/jwt";

export async function updateTechnicianProfile(user: UserJwtPayload, data) {
  const isExist = await prisma.technicianProfile.findFirst({
    where: {
      user: {
        email: user.email
      }
    }
  })

  console.log(isExist)

  // your update logic goes here
}
