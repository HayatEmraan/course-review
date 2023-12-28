import { Types } from 'mongoose'
import { comparePassword } from '../../utils/bcrypt'
import { HistoryModel } from '../history/history.schema'

export const authOptions = {
  ADMIN: 'admin',
  USER: 'user',
}

const changeUtils = async (userId: Types.ObjectId, hash: string) => {
  await HistoryModel.create({
    userId,
    changeAt: new Date(),
    hash,
  })
}

export const changeAtPassword = async (
  userId: Types.ObjectId,
  hash: string,
  password?: string,
) => {
  const userPass = await HistoryModel.find({ userId })
  if (userPass.length === 0) {
    return await changeUtils(userId, hash)
  } else {
    for (const hashInfo of userPass) {
      const compared = await comparePassword(password as string, hashInfo.hash)
      if (compared) {
        return hashInfo
      }
    }
    if (userPass.length === 2) {
      await HistoryModel.findOneAndDelete({ userId }).sort({ _id: 1 })
      return await changeUtils(userId, hash)
    } else {
      return await changeUtils(userId, hash)
    }
  }
}
