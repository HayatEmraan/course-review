import { ZodError } from 'zod'

export const zodErrorHandler = (error: ZodError) => {
  return {
    success: false,
    message: 'Validation Error',
    errorMessage: error.issues
      .map(issue => {
        return `${issue.path[issue.path.length - 1]} is ${issue.message}`
      })
      .join(', '),
    errorDetails: error,
    stack: error.stack,
  }
}
