import { Router } from 'express'
import { CategoryController } from './category.controller'

export const CategoryRoutes = Router()

CategoryRoutes.post('/', CategoryController.createCategory)
CategoryRoutes.get('/', CategoryController.getCategories)
