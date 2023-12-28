import jwt from 'jsonwebtoken'
import config from '../config'

export const decodeJWT = (token: string) => {
  return jwt.verify(token, config.jwt_secret as string)
}
