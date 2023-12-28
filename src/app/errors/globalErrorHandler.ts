/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import { ZodError } from 'zod'
import { validationErrorHandler } from './validationErrorHanlder'
import { castErrorHandler } from './castErrorHandler'
import { zodErrorHandler } from './zodErrorHanlder'
import AppError from './AppError'
import { duplicateErrorHandler } from './duplicateErrorHandler'

const errorTypeChecking = (error: any) => {
  let err: any
  if (error instanceof mongoose.Error.ValidationError) {
    err = validationErrorHandler(error)
  } else if (error instanceof mongoose.Error.CastError) {
    err = castErrorHandler(error)
  } else if (error instanceof ZodError) {
    err = zodErrorHandler(error)
  } else if (error instanceof AppError) {
    err = error
  } else if (error.code === 11000) {
    err = duplicateErrorHandler(error)
  } else if (error instanceof Error) {
    err = error
  }
  return err
}

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  return res.status(error.status || 500).json(errorTypeChecking(error))
}
