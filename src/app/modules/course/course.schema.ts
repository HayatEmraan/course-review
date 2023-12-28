import { Schema, model } from 'mongoose'
import { TCourse } from './course.type'

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    _id: false,
  },
)

const DetailSchema = new Schema(
  {
    level: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    _id: false,
  },
)

const CourseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: [TagSchema],
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    durationInWeeks: {
      type: Number,
      required: true,
    },
    details: DetailSchema,
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export const CourseModel = model<TCourse>('Course', CourseSchema)
