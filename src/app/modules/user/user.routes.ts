import { Router } from 'express'
import { requestValidation } from '../../utils/requestValidation'
import {
  UserPasswordValidation,
  userLoginValidation,
  userValidation,
} from './user.validation'
import { UserController } from './user.controller'
import { auth } from '../../utils/auth'
import { authOptions } from './user.utils'

export const UserRoutes = Router()

UserRoutes.post(
  '/register',
  requestValidation(userValidation),
  UserController.CreateUser,
)

UserRoutes.post(
  '/login',
  requestValidation(userLoginValidation),
  UserController.UserLogin,
)

UserRoutes.post(
  '/change-password',
  auth(authOptions.ADMIN, authOptions.USER),
  requestValidation(UserPasswordValidation),
  UserController.changePassword,
)
