import { request } from '@/services/api/http'

type TodayStatus = {
  completedCount: number
  totalCount: number
  unsubmittedTitles: string[]
}

type WeeklyAchievement = {
  mentorAssignmentRate: number
  generalTodoRate: number
}

type SubjectProgress = {
  subject: string
  progress: number
}

type MenteeDetails = {
  menteeId: number
  menteeName: string
  todayStatus: TodayStatus
  weeklyAchievement: WeeklyAchievement
  subjectAchievement: SubjectProgress[]
  weeklyFeedbackSummary: string
}

type MenteeItem = {
  menteeId: number
  menteeName: string
  details: MenteeDetails
}

type MentorMenteesResponseDto = {
  mentees: MenteeItem[]
}

type MentorMenteesResponse = {
  data: MentorMenteesResponseDto
}

const getMentorMentees = (mentorId: number) =>
  request<MentorMenteesResponse>({
    method: 'GET',
    url: `/mentors/${mentorId}/mentees`,
  })

const mentorMenteesApi = {
  getMentorMentees,
}

export type { MenteeItem, MenteeDetails, TodayStatus, WeeklyAchievement, SubjectProgress }
export default mentorMenteesApi
