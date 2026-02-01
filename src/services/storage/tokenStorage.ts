const ACCESS_TOKEN_KEY = 'accessToken'

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export { getAccessToken, setAccessToken, clearAccessToken }
