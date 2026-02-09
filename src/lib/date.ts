const KOREAN_WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const

const formatKoreanDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = KOREAN_WEEKDAYS[date.getDay()]
  return `${year}년 ${month}월 ${day}일 (${weekday})`
}

/** 'YYYY-MM-DD' 형식 문자열을 'YYYY.MM.DD' 표시용 문자열로 변환 */
const toDateText = (dateText?: string): string => {
  if (!dateText) return ''
  const [year, month, day] = dateText.split('-')
  if (!year || !month || !day) return dateText
  return `${year}.${month}.${day}`
}

export { formatKoreanDate, toDateText }
