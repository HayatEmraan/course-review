import { Router } from 'express'
import { ReviewController } from './review.controller'
import { requestValidation } from '../../utils/requestValidation'
import { reviewValidation } from './review.validation'
import { auth } from '../../utils/auth'
import { authOptions } from '../user/user.utils'

export const ReviewRoutes = Router()

ReviewRoutes.post(
  '/',
  auth(authOptions.USER),
  requestValidation(reviewValidation),
  ReviewController.createReview,
)

ReviewRoutes.get('/')
