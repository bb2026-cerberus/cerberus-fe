type TimePoint = {
  hours: number
  minutes: number
}

function parseTime(value: string): TimePoint | null {
  const [rawHours, rawMinutes] = value.split(':')
  const hours = Number(rawHours)
  const minutes = Number(rawMinutes)
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null
  return { hours, minutes }
}

function toMinutes(value: string): number {
  const parsed = parseTime(value)
  if (!parsed) return 0
  return parsed.hours * 60 + parsed.minutes
}

function diffMinutes(start: string, end: string): number {
  const startMinutes = toMinutes(start)
  const endMinutes = toMinutes(end)
  if (endMinutes >= startMinutes) return endMinutes - startMinutes
  return 24 * 60 - startMinutes + endMinutes
}

function toMinutesFromStart(value: string, startHour: number): number {
  const minutes = toMinutes(value)
  const startMinutes = startHour * 60
  if (minutes < startMinutes) return minutes + 24 * 60 - startMinutes
  return minutes - startMinutes
}

export { diffMinutes, parseTime, toMinutes, toMinutesFromStart }
