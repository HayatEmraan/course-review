import { RequestHandler } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import { globalResponseSend } from '../../utils/globalResponseSend'
import { UserService } from './user.service'

const CreateUser: RequestHandler = catchAsync(async (req, res) => {
  globalResponseSend(res, {
    status: 201,
    message: 'User registered successfully',
    data: await UserService.createUser(req.body),
  })
})

const UserLogin: RequestHandler = catchAsync(async (req, res) => {
  globalResponseSend(res, {
    status: 200,
    message: 'User logged in successfully',
    data: await UserService.userLogin(req.body),
  })
})

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  globalResponseSend(res, {
    status: 200,
    message: 'Password changed successfully',
    data: await UserService.changePassword(req.user, req.body),
  })
})

export const UserController = {
  CreateUser,
  UserLogin,
  changePassword,
}
