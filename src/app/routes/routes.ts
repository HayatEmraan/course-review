import { Router } from 'express'
import { CategoryRoutes } from '../modules/category/category.routes'
import { ReviewRoutes } from '../modules/review/review.routes'
import { CourseRoutes, CoursesRoutes } from '../modules/course/course.routes'

export const router = Router()

const stackRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/courses',
    route: CoursesRoutes,
  },
]

stackRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})
