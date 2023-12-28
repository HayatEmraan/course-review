import { CategoryModel } from './category.schema'
import { TCategory } from './category.type'

const createCategory = async (payload: TCategory) => {
  return CategoryModel.create(payload)
}

const getCategories = async () => {
  return CategoryModel.find({})
}

export const CategoryService = {
  createCategory,
  getCategories,
}
