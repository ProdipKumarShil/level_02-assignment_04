import type { Request, Response } from "express"
import { catchAsync } from "../../utils/catch-async"
import { loginSchema, registerSchema } from "./auth.validation"
import { loginUser, registerUser } from "./auth.service"
import { sendResponse } from "../../utils/send-response"

export const register = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body)
  const input = registerSchema.parse(req.body)
  const result = await registerUser(input)
  sendResponse(res, { message: "User register successfully", data: { user: result } }, 201)

})
export const login = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body)
  const input = loginSchema.parse(req.body)
  const result = await loginUser(input)

  sendResponse(res, {
    message: 'Login successfully', data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken
    }
  })
})
