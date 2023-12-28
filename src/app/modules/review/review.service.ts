import AppError from '../../errors/AppError'
import { UserModel } from '../user/user.schema'
import { TUserJWT } from './../user/user.type'
import { ReviewModel } from './review.schema'
import { TReview } from './review.type'

const createReview = async (user: TUserJWT, payload: TReview) => {
  const { _id, role, email } = user
  const exitUser = await UserModel.findOne({ _id, role, email })
  if (!exitUser) {
    throw new AppError(404, 'User not found')
  }
  return ReviewModel.create({
    ...payload,
    createdBy: _id,
  })
}

export const ReviewService = {
  createReview,
}
