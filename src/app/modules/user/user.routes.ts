import { Router } from 'express'
import { requestValidation } from '../../utils/requestValidation'
import { userLoginValidation, userValidation } from './user.validation'
import { UserController } from './user.controller'

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
