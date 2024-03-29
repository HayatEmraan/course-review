/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { ReviewModel } from '../review/review.schema'
import { detailsConst, durationCourse } from './course.constant'
import { CourseModel } from './course.schema'
import { TCourse } from './course.type'
import AppError from '../../errors/AppError'
import { TUserJWT } from '../user/user.type'
import { UserModel } from '../user/user.schema'

const createCourse = async (user: TUserJWT, payload: TCourse) => {
  const { _id, role, email } = user
  const exitUser = await UserModel.findOne({ _id, role, email })
  if (!exitUser) {
    throw new AppError(404, 'User not found')
  }
  const durationInWeeks = await durationCourse(
    payload?.startDate,
    payload?.endDate,
  )
  return CourseModel.create({
    ...payload,
    durationInWeeks,
    createdBy: _id,
  })
}

// todo
const getCourses = async (query: Record<string, unknown>) => {
  const {
    page,
    limit,
    language,
    provider,
    durationInWeeks,
    level,
    tags,
    sortOrder,
    sortBy,
    minPrice,
    maxPrice,
    startDate,
    endDate,
  } = query
  const filterQuery: Record<string, unknown> = {}

  if (language) {
    filterQuery['language'] = language
  }
  if (provider) {
    filterQuery['provider'] = provider
  }
  if (durationInWeeks) {
    filterQuery['durationInWeeks'] = durationInWeeks
  }
  if (level) {
    filterQuery['details.level'] = level
  }
  if (tags) {
    filterQuery['tags.name'] = tags
  }

  let mainQuery = CourseModel.find(filterQuery).populate('createdBy')

  if (minPrice && maxPrice) {
    mainQuery = mainQuery.find({
      price: { $gte: minPrice, $lte: maxPrice },
    })
  }
  if (startDate && endDate) {
    mainQuery = mainQuery.find({
      $and: [
        { startDate: { $gte: startDate } },
        { endDate: { $lte: endDate } },
      ],
    })
  }

  mainQuery = mainQuery.sort([
    [(sortBy as any) || 'createdAt', (sortOrder as any) || 'asc'],
  ])

  const pageCount = (parseInt(page as string) || 1) - 1
  const limitCount = parseInt(limit as string) || 10
  return {
    meta: {
      page: parseInt((page as string) || '1'),
      limit: parseInt((limit as string) || '10'),
      total: await CourseModel.estimatedDocumentCount(),
    },
    data: {
      courses: await mainQuery.limit(limitCount).skip(limitCount * pageCount),
    },
  }
}

const updateACourse = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...courseInfo } = payload
  const session = await mongoose.startSession()

  let durationInWeeks

  if (courseInfo?.startDate && courseInfo?.endDate) {
    durationInWeeks = await durationCourse(
      courseInfo?.startDate,
      courseInfo?.endDate,
    )
  }
  try {
    await session.startTransaction()

    const exitCourse = await CourseModel.findById(id)
    if (!exitCourse) {
      throw new AppError(404, 'Course not found')
    }

    const deletedTags = tags
      ?.filter(tag => tag.name && tag.isDeleted)
      .map(tag => tag.name)
    const addedTags = tags?.filter(tag => tag.name && !tag.isDeleted)

    if (details && Object.keys(details).length > 0) {
      const detailsObject = await detailsConst(details)
      await CourseModel.findByIdAndUpdate(id, detailsObject, {
        session,
      })
    }

    if (addedTags) {
      await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: addedTags } },
        },
        {
          session,
        },
      )
    }

    if (deletedTags) {
      await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: {
              name: {
                $in: deletedTags,
              },
            },
          },
        },
        {
          session,
        },
      )
    }
    const result = await CourseModel.findByIdAndUpdate(
      id,
      { ...courseInfo, durationInWeeks },
      { new: true, session },
    ).populate('createdBy')

    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(error.status || 500, error.message)
  }
}

const getCourseWithReviews = async (id: string) => {
  const course = await CourseModel.findById(id).populate('createdBy')
  const reviews = await ReviewModel.find({ courseId: id }).populate('createdBy')
  return {
    course,
    reviews,
  }
}

const getCourseWithBestRating = async () => {
  const avgRatingNCount = await ReviewModel.aggregate([
    {
      $group: {
        _id: '$courseId',
        reviewCount: {
          $count: {},
        },
        averageRating: {
          $avg: '$rating',
        },
      },
    },
    {
      $sort: {
        reviewCount: -1,
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'course.createdBy',
        foreignField: '_id',
        as: 'course.createdBy',
      },
    },
    {
      $unwind: '$course.createdBy',
    },
    {
      $unset: ['course.createdBy.password'],
    },
  ]).project({
    _id: 0,
    course: 1,
    averageRating: 1,
    reviewCount: 1,
  })

  return {
    course: avgRatingNCount[0]?.course,
    averageRating: avgRatingNCount[0]?.averageRating,
    reviewCount: avgRatingNCount[0]?.reviewCount,
  }
}

export const CourseService = {
  createCourse,
  getCourses,
  updateACourse,
  getCourseWithReviews,
  getCourseWithBestRating,
}
