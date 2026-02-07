import type { SubjectWithNeutral } from '@/types/ui/subject'

type TaskItem = {
  id?: string
  title: string
  subtitle?: string
  subject?: SubjectWithNeutral
  subjectLabel?: string
  completed?: boolean
}

type TaskGroup = {
  dateText: string
  items: TaskItem[]
}

export type { TaskItem, TaskGroup }
