import AppError from '../../errors/AppError'
import { UserModel } from '../user/user.schema'
import { TUserJWT } from './../user/user.type'
import { CategoryModel } from './category.schema'
import { TCategory } from './category.type'

const createCategory = async (user: TUserJWT, payload: TCategory) => {
  const { _id, role, email } = user
  const exitUser = await UserModel.findOne({ _id, role, email })
  if (!exitUser) {
    throw new AppError(404, 'User not found')
  }
  return await CategoryModel.create({
    ...payload,
    createdBy: _id,
  })
}

const getCategories = async () => {
  return {
    categories: await CategoryModel.find({}).populate('createdBy'),
  }
}

export const CategoryService = {
  createCategory,
  getCategories,
}
