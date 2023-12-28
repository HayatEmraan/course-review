export const detailsConst = async (payload: Record<string, unknown>) => {
  const details: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(payload)) {
    details[`details.${key}`] = value
  }
  return details
}

export const durationCourse = async (start: string, end: string) => {
  const startDate = new Date(start).getTime()
  const endDate = new Date(end).getTime()

  return Math.ceil(Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) / 7)
}
