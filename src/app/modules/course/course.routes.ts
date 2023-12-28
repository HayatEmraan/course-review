import { Router } from 'express'
import { CourseController } from './course.controller'
import { requestValidation } from '../../utils/requestValidation'
import { courseValidation, updateCourseValidation } from './course.validationt'
import { auth } from '../../utils/auth'
import { authOptions } from '../user/user.utils'
// Course Routes
export const CourseRoutes = Router()

CourseRoutes.get('/best', CourseController.bestCourseWithRating)

// Courses Routes
export const CoursesRoutes = Router()
CoursesRoutes.post(
  '/',
  auth(authOptions.ADMIN),
  requestValidation(courseValidation),
  CourseController.createCourse,
)
CoursesRoutes.get('/', CourseController.getCourses)
CoursesRoutes.put(
  '/:courseId',
  auth(authOptions.ADMIN),
  requestValidation(updateCourseValidation),
  CourseController.updateCourse,
)
CoursesRoutes.get('/:courseId/reviews', CourseController.courseWithReviews)
