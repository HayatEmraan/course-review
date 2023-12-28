import AppError from '../../errors/AppError'
import { UserModel } from './user.schema'
import { TUser, TUserLogin } from './user.type'

const createUser = async (payload: TUser) => {
  return UserModel.create(payload)
}

const userLogin = async (payload: TUserLogin) => {
  const user = await UserModel.findOne({ username: payload.username })
  if (!user) {
    throw new AppError(404, 'User not found')
  }

}

export const UserService = {
  createUser,
  userLogin,
}
