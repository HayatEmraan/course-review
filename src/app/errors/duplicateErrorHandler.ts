/* eslint-disable @typescript-eslint/no-explicit-any */
export const duplicateErrorHandler = (error: any) => {
  return {
    success: false,
    message: 'Duplicate Entry',
    errorMessage: `${Object.values(error.keyValue)[0]} already exists!`,
    errorDetails: error,
    stack: error.stack,
  }
}
