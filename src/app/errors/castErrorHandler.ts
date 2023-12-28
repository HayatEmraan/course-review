import mongoose from 'mongoose'

export const castErrorHandler = (error: mongoose.Error.CastError) => {
  return {
    success: false,
    message: 'Invalid ID',
    errorMessage: `${error.value} is not a valid ID!`,
    errorDetails: error,
    stack: error.stack,
  }
}
