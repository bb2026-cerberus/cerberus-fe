const KOREAN_WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const

const formatKoreanDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = KOREAN_WEEKDAYS[date.getDay()]
  return `${year}년 ${month}월 ${day}일 (${weekday})`
}

export { formatKoreanDate }
