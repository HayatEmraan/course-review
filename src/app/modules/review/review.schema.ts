import { Schema, model } from 'mongoose'
import { TReview } from './review.type'

const ReviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
})

export const ReviewModel = model<TReview>('Review', ReviewSchema)
