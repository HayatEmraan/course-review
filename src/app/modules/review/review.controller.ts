import { RequestHandler } from 'express'
import { globalResponseSend } from '../../utils/globalResponseSend'
import { ReviewService } from './review.service'
import { catchAsync } from '../../utils/catchAsync'

const createReview: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseSend(res, {
    status: 201,
    message: 'Review created successfully',
    data: await ReviewService.createReview(req.body),
  })
})

export const ReviewController = {
  createReview,
}
