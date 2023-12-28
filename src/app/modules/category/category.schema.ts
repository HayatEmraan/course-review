import { Schema, model } from 'mongoose'
import { TCategory } from './category.type'

const CategorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export const CategoryModel = model<TCategory>('Category', CategorySchema)
