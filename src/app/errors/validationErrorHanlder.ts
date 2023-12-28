/* eslint-disable @typescript-eslint/no-explicit-any */
export const validationErrorHandler = (error: any) => {
  return {
    success: false,
    message: 'Validation Error',
    errorMessage: Object.values(error.errors)
      .map((err: any) => `${err.path} is ${err.kind}`)
      .join(', '),
    errorDetails: error,
    stack: error.stack,
  }
}
