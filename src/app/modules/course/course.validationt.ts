import { z } from 'zod'

export const courseValidation = z.object({
  body: z.object({
    title: z.string().min(1),
    instructor: z.string().min(1),
    categoryId: z.string(),
    price: z.number().nonnegative(),
    tags: z.array(
      z.object({
        name: z.string().min(1),
        isDeleted: z.boolean().default(false),
      }),
    ),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string().min(1),
    provider: z.string().min(1),
    details: z.object({
      level: z.string().min(1),
      description: z.string().min(1),
    }),
  }),
})

export const updateCourseValidation = courseValidation.deepPartial()
