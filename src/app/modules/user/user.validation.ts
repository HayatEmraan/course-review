import { z } from 'zod'

export const userValidation = z.object({
  body: z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
    role: z.enum(['user', 'admin']).optional(),
  }),
})

export const userLoginValidation = z.object({
  body: z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
  }),
})

export const UserPasswordValidation = z.object({
  body: z.object({
    currentPassword: z
      .string()
      .min(1, { message: ' Current Password is required' }),
    newPassword: z.string().min(1, { message: ' New Password is required' }),
  }),
})
