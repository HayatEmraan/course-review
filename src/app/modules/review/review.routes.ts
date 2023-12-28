import { Router } from 'express'
import { ReviewController } from './review.controller'
import { requestValidation } from '../../utils/requestValidation'
import { reviewValidation } from './review.validation'

export const ReviewRoutes = Router()

ReviewRoutes.post(
  '/',
  requestValidation(reviewValidation),
  ReviewController.createReview,
)

ReviewRoutes.get('/')
