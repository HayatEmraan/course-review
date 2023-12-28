import { RequestHandler } from 'express'
import { CategoryService } from './category.service'
import { globalResponseSend } from '../../utils/globalResponseSend'
import { catchAsync } from '../../utils/catchAsync'

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseSend(res, {
    status: 201,
    message: 'Category created successfully',
    data: await CategoryService.createCategory(req.body),
  })
})

const getCategories: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseSend(res, {
    status: 200,
    message: 'Categories retrieved successfully',
    data: await CategoryService.getCategories(),
  })
})

const updateReview: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseSend(res, {
    status: 200,
    message: 'Review updated successfully',
    data: [],
  })
})

export const CategoryController = {
  createCategory,
  getCategories,
  updateReview,
}
