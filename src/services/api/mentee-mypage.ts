import { request } from '@/services/api/http'

type SubjectProgressDto = {
  subject: string
  progress: number
}

type WeeklyAchievement = {
  mentorAssignmentRate: number
  generalTodoRate: number
}

type MenteeMypageResponseDto = {
  menteeId: number
  menteeName: string
  weeklyAchievement: WeeklyAchievement
  subjectAchievement: SubjectProgressDto[]
}

type MenteeMypageResponse = {
  data: MenteeMypageResponseDto
}

const getMenteeMypage = (menteeId: number) =>
  request<MenteeMypageResponse>({
    method: 'GET',
    url: `/mentees/${menteeId}/my-page`,
  })

const menteeMypageApi = {
  getMenteeMypage,
}

export type { MenteeMypageResponseDto, WeeklyAchievement, SubjectProgressDto }
export default menteeMypageApi
