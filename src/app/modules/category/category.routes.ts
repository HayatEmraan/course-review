import { Router } from 'express'
import { CategoryController } from './category.controller'
import { auth } from '../../utils/auth'
import { authOptions } from '../user/user.utils'

export const CategoryRoutes = Router()

CategoryRoutes.post(
  '/',
  auth(authOptions.ADMIN),
  CategoryController.createCategory,
)
CategoryRoutes.get('/', CategoryController.getCategories)
