import axios from 'axios'

// Base API URL — change via Vite env var `VITE_API_BASE` or fallback to default
// Note: use `import.meta.env.VITE_API_BASE` (Vite) — don't use `process.env` in the browser.
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) || 'https://testapicms.pvorasp.com/api'

export function getToken() {
  return (
    localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('accessToken') || ''
  )
}

export async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = Object.assign({}, options.headers || {})
  if (token) headers.Authorization = token

  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`
  return fetch(url, { ...options, headers })
}

// Axios instance with automatic Authorization header
export const apiClient = axios.create({ baseURL: API_BASE })
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) config.headers = { ...(config.headers || {}), Authorization: token }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiFetch
