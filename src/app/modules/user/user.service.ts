import AppError from '../../errors/AppError'
import { hashPassword } from '../../utils/bcrypt'
import { encodeJWT } from '../../utils/encodeJWT'
import { UserModel } from './user.schema'
import { TUser, TUserChangePassword, TUserJWT, TUserLogin } from './user.type'
import { changeAtPassword } from './user.utils'

const createUser = async (payload: TUser) => {
  const { password } = payload
  const passwordHash = await hashPassword(password)
  const user = {
    ...payload,
    password: passwordHash,
  }
  const result = await UserModel.create(user)
  await changeAtPassword(result._id, passwordHash)
  return result
}

const userLogin = async (payload: TUserLogin) => {
  const user = await UserModel.findOne({ username: payload.username })
  if (!user) {
    throw new AppError(404, 'User not found')
  }
  const { _id, role = 'user', email } = user
  const userData = {
    _id,
    role,
    email,
  }
  const isMatch = await UserModel.isMatch(userData, payload.password)
  if (!isMatch) {
    throw new AppError(404, 'Password not match')
  }

  const token = encodeJWT(userData)
  return {
    user,
    token,
  }
}

const changePassword = async (user: TUserJWT, payload: TUserChangePassword) => {
  const { _id, role, email } = user
  const userData = {
    _id,
    role,
    email,
  }
  const matchPassword = await UserModel.isMatch(
    userData,
    payload.currentPassword,
  )
  if (!matchPassword) {
    throw new AppError(404, 'Current password not match')
  }
  const password = await hashPassword(payload.newPassword)

  const historyChangeAt = await changeAtPassword(
    _id,
    password,
    payload.newPassword,
  )
  if (historyChangeAt) {
    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${historyChangeAt.changeAt}).`,
      data: null,
    }
  }

  return UserModel.findByIdAndUpdate(_id, {
    password,
  })
}

export const UserService = {
  createUser,
  userLogin,
  changePassword,
}
