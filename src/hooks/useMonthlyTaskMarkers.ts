import * as React from 'react'

import assignmentsApi from '@/services/api/assignments'
import todosApi from '@/services/api/todos'

type MarkerSet = {
  dotBlue: Date[]
  dotOrange: Date[]
  dotRed: Date[]
}

type UseMonthlyTaskMarkersOptions = {
  menteeId: number | null
  baseMonth: Date
}

type AssignmentGroup = {
  date?: string
  assignments?: {
    title?: string
    solution?: string
    subject?: string
  }[]
}

type TodoGroup = {
  date?: string
  todos?: {
    title?: string
    solution?: string
    subject?: string
    completed?: boolean
  }[]
}

const emptyMarkers: MarkerSet = { dotBlue: [], dotOrange: [], dotRed: [] }

const toDate = (dateText?: string): Date | null => {
  if (!dateText) return null
  const [y, m, d] = dateText.split('-').map((value) => Number(value))
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

const toDateString = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const addDays = (dateText: string, days: number) => {
  const date = toDate(dateText)
  if (!date) return dateText
  const next = new Date(date)
  next.setDate(date.getDate() + days)
  return toDateString(next)
}

const isSameMonth = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth()

const getMonthRangeWithNextDay = (baseMonth: Date) => {
  const start = new Date(baseMonth.getFullYear(), baseMonth.getMonth(), 1)
  const end = new Date(baseMonth.getFullYear(), baseMonth.getMonth() + 1, 0)
  const endPlusOne = new Date(end)
  endPlusOne.setDate(end.getDate() + 1)
  return {
    startDate: toDateString(start),
    endDate: toDateString(endPlusOne),
    monthAnchor: start,
  }
}

const useMonthlyTaskMarkers = ({ menteeId, baseMonth }: UseMonthlyTaskMarkersOptions) => {
  const [markers, setMarkers] = React.useState<MarkerSet>(emptyMarkers)
  const [assignmentGroups, setAssignmentGroups] = React.useState<AssignmentGroup[]>([])
  const [todoGroups, setTodoGroups] = React.useState<TodoGroup[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const fetchMonthly = React.useCallback(async () => {
    if (!menteeId) {
      setMarkers(emptyMarkers)
      return
    }
    const { startDate, endDate, monthAnchor } = getMonthRangeWithNextDay(baseMonth)
    setLoading(true)
    setError(null)
    try {
      const [assignmentsRes, todosRes] = await Promise.all([
        assignmentsApi.getAssignments({ menteeId, startDate, endDate }),
        todosApi.getTodos({ menteeId, startDate, endDate }),
      ])

      const assignments = (assignmentsRes?.data ?? []) as AssignmentGroup[]
      const todos = (todosRes?.data ?? []) as TodoGroup[]

      const dotBlue = assignments
        .map((group) => toDate(group.date))
        .filter((date): date is Date => Boolean(date))
        .filter((date) => isSameMonth(date, monthAnchor))

      const dotOrange = todos
        .map((group) => toDate(group.date))
        .filter((date): date is Date => Boolean(date))
        .filter((date) => isSameMonth(date, monthAnchor))

      setMarkers({ dotBlue, dotOrange, dotRed: [] })
      setAssignmentGroups(assignments)
      setTodoGroups(todos)
    } catch (err) {
      setError('월간 데이터를 불러오지 못했어요.')
      setMarkers(emptyMarkers)
      setAssignmentGroups([])
      setTodoGroups([])
    } finally {
      setLoading(false)
    }
  }, [baseMonth, menteeId])

  React.useEffect(() => {
    fetchMonthly()
  }, [fetchMonthly])

  const getAssignmentsByDate = React.useCallback(
    (dateText?: string | null) =>
      assignmentGroups.find((group) => group.date === dateText)?.assignments ?? [],
    [assignmentGroups],
  )

  const getTodosByDate = React.useCallback(
    (dateText?: string | null) =>
      todoGroups.find((group) => group.date === dateText)?.todos ?? [],
    [todoGroups],
  )

  const getAssignmentsByRange = React.useCallback(
    (dateText?: string | null, includeNextDay = false) => {
      if (!dateText) return []
      const dates = includeNextDay ? [dateText, addDays(dateText, 1)] : [dateText]
      return dates.flatMap((date) => getAssignmentsByDate(date))
    },
    [getAssignmentsByDate],
  )

  const getTodosByRange = React.useCallback(
    (dateText?: string | null, includeNextDay = false) => {
      if (!dateText) return []
      const dates = includeNextDay ? [dateText, addDays(dateText, 1)] : [dateText]
      return dates.flatMap((date) => getTodosByDate(date))
    },
    [getTodosByDate],
  )

  const getTimeSummaryByRange = React.useCallback(
    (dateText?: string | null, includeNextDay = false) => {
      const assignments = getAssignmentsByRange(dateText, includeNextDay)
      const todos = getTodosByRange(dateText, includeNextDay)
      const taskCount = assignments.length + todos.length
      const totalMinutes = taskCount * 30
      const averageMinutes = taskCount ? Math.round(totalMinutes / taskCount) : 0
      return { totalMinutes, averageMinutes }
    },
    [getAssignmentsByRange, getTodosByRange],
  )

  return {
    markers,
    assignmentGroups,
    todoGroups,
    getAssignmentsByDate,
    getTodosByDate,
    getAssignmentsByRange,
    getTodosByRange,
    getTimeSummaryByRange,
    loading,
    error,
    refetch: fetchMonthly,
  }
}

export default useMonthlyTaskMarkers
export type { MarkerSet }
