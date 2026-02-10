export type TodoTimerSessionDto = {
  startAt?: string
  endAt?: string
  minutes?: number
}

export type TodoTimerItemDto = {
  todoId?: number
  title?: string
  subject?: string
  note?: string
  name?: string
  assignYn?: string
  totalMinutes?: number
  sessions?: TodoTimerSessionDto[]
}

export type TodoTimerDailyResponseDto = {
  menteeId?: number
  date?: string
  totalMinutes?: number
  averageMinutes?: number
  items?: TodoTimerItemDto[]
}

export type TodoDailyDetailItemDto = {
  todoId?: number
  menteeId?: string
  subject?: string
  note?: string
  name?: string
  title?: string
  assignYn?: string
  type?: string
  completeYn?: string
  todoDate?: string
}

export type TodoDailyDetailResponseDto = {
  menteeId?: number
  date?: string
  totalCount?: number
  items?: TodoDailyDetailItemDto[]
}

export type TodoDailyOverviewResponseDto = {
  menteeId?: number
  date?: string
  todoDetail?: TodoDailyDetailResponseDto
  timerSummary?: TodoTimerDailyResponseDto
}

export type TodoDailyOverviewResponse = {
  success?: boolean
  data?: TodoDailyOverviewResponseDto
}
