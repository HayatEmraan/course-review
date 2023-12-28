import { z } from 'zod'

export const reviewValidation = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z
      .number()
      .min(1, { message: 'Rating must be between 1 and 5' })
      .max(5, { message: 'Rating must be between 1 and 5' }),
    review: z.string(),
  }),
})
