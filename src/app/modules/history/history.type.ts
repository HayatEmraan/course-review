import { Types } from 'mongoose'

export type THistory = {
  hash: string
  userId: Types.ObjectId
  changeAt: Date
}
