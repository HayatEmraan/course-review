import AppError from '../../errors/AppError'
import { CourseModel } from '../course/course.schema'
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
  const exitCourse = await CourseModel.findById(payload.courseId)
  if (!exitCourse) {
    throw new AppError(404, 'Course not found')
  }
  const review = await ReviewModel.create({
    ...payload,
    createdBy: _id,
  })
  return ReviewModel.findById(review._id).populate('createdBy')
}

export const ReviewService = {
  createReview,
}
