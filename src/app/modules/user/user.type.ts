import { Types } from 'mongoose'

export type TUser = {
  username: string
  email: string
  password: string
  role?: 'user' | 'admin'
}

export type TUserLogin = {
  username: string
  password: string
}

export type TUserJWT = {
  _id: Types.ObjectId
  role: 'user' | 'admin'
  email: string
  iat: number
  exp: number
}
