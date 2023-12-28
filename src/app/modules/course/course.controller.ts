import { RequestHandler } from 'express'
import { globalResponseSend } from '../../utils/globalResponseSend'
import { CourseService } from './course.service'
import { catchAsync } from '../../utils/catchAsync'

// Single Course Routes Controller
const createCourse: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseSend(res, {
    status: 201,
    message: 'Course created successfully',
    data: await CourseService.createCourse(req.body),
  })
})

const bestCourseWithRating: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseSend(res, {
    status: 200,
    message: 'Best course retrieved successfully',
    data: await CourseService.getCourseWithBestRating(),
  })
})

// Courses Routes Controller

const courseWithReviews: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseSend(res, {
    status: 200,
    message: 'Course and Reviews retrieved successfully',
    data: await CourseService.getCourseWithReviews(req.params.courseId),
  })
})

const getCourses: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseService.getCourses(req.query)
  return globalResponseSend(res, {
    status: 200,
    message: 'Courses retrieved successfully',
    meta: result?.meta,
    data: result?.data,
  })
})
const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseSend(res, {
    status: 200,
    message: 'Course updated successfully',
    data: await CourseService.updateACourse(req.params.courseId, req.body),
  })
})

export const CourseController = {
  getCourses,
  createCourse,
  updateCourse,
  courseWithReviews,
  bestCourseWithRating,
}
