import { NextFunction, Request, Response } from 'express'
import { decodeJWT } from './decodeJWT'
import { TUserJWT } from '../modules/user/user.type'
import { unauthorizedError } from './unauthorizedError'
import { UserModel } from '../modules/user/user.schema'

export const auth = (...args: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
        return res.status(401).json(unauthorizedError)
      }
      const decode = decodeJWT(authHeader) as TUserJWT
      if (!decode) {
        return res.status(401).json(unauthorizedError)
      }

      if (args.length > 0) {
        if (!args.includes(decode.role)) {
          return res.status(401).json(unauthorizedError)
        }
      }

      const user = await UserModel.findOne({
        _id: decode._id,
        role: decode.role,
        email: decode.email,
      })

      if (!user) {
        return res.status(401).json(unauthorizedError)
      }

      req.user = decode
      next()
    } catch (error) {
      return res.status(401).json(unauthorizedError)
    }
  }
}
