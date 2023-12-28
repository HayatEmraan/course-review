import { ReviewModel } from './review.schema'
import { TReview } from './review.type'

const createReview = async (payload: TReview) => {
  return ReviewModel.create(payload)
}

export const ReviewService = {
    createReview
}
