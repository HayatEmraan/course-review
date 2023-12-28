import bcrypt from 'bcrypt'
import config from '../config'

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, Number(config.bcrypt_salt))
}

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}
