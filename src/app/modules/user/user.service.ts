import AppError from '../../errors/AppError'
import { hashPassword } from '../../utils/bcrypt'
import { UserModel } from './user.schema'
import { TUser, TUserChangePassword, TUserJWT, TUserLogin } from './user.type'

const createUser = async (payload: TUser) => {
  return UserModel.create(payload)
}

const userLogin = async (payload: TUserLogin) => {
  const user = await UserModel.findOne({ username: payload.username })
  if (!user) {
    throw new AppError(404, 'User not found')
  }
}

const changePassword = async (user: TUserJWT, payload: TUserChangePassword) => {
  const { _id, role, email } = user
  const userData = {
    _id,
    role,
    email,
  }
  const exitUser = await UserModel.findOne({ _id, role, email })
  if (!exitUser) {
    throw new AppError(404, 'User not found')
  }

  const matchPassword = await UserModel.isMatch(
    userData,
    payload.currentPassword,
  )
  if (!matchPassword) {
    throw new AppError(404, 'Current password not match')
  }
  const password = hashPassword(payload.newPassword)

  return UserModel.findByIdAndUpdate(_id, {
    password,
  })
}

export const UserService = {
  createUser,
  userLogin,
  changePassword,
}
