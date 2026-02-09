const USER_ID_KEY = 'userId'

const getUserId = (): number | null => {
  const raw = localStorage.getItem(USER_ID_KEY)
  if (!raw) return null
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : null
}

const setUserId = (userId: number) => {
  localStorage.setItem(USER_ID_KEY, String(userId))
}

const clearUserId = () => {
  localStorage.removeItem(USER_ID_KEY)
}

export { getUserId, setUserId, clearUserId }
