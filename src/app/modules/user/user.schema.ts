import { Schema, model } from 'mongoose'
import { ExtentUser, TUser, TUserJWT } from './user.type'
import AppError from '../../errors/AppError'
import { comparePassword } from '../../utils/bcrypt'

const userSchema = new Schema<TUser, ExtentUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

userSchema.statics.isMatch = async function (
  user: Omit<TUserJWT, 'iat' | 'exp'>,
  password: string,
) {
  const userFound = await this.findOne(user).select('password')
  if (!userFound) {
    throw new AppError(404, 'User not found')
  }
  return await comparePassword(password, userFound.password)
}

export const UserModel = model<TUser, ExtentUser>('User', userSchema)
