import jwt from 'jsonwebtoken'
import config from '../config'

export const encodeJWT = (payload: Record<string, unknown>) => {
  return jwt.sign(payload, config.jwt_secret as string, {
    expiresIn: '1d',
  })
}
