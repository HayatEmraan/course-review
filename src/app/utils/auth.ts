import { NextFunction, Request, Response } from 'express'
import { catchAsync } from './catchAsync'
import AppError from '../errors/AppError'
import { decodeJWT } from './decodeJWT'
import { TUserJWT } from '../modules/user/user.type'

export const auth = (...args: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new AppError(401, 'Unauthorized Access')
    }
    const decode = decodeJWT(authHeader) as TUserJWT
    if (!decode) {
      throw new AppError(401, 'Unauthorized Access')
    }

    if (args.length > 0) {
      if (!args.includes(decode.role)) {
        throw new AppError(401, 'Unauthorized Access')
      }
    }
    req.user = decode
    next()
  })
}
