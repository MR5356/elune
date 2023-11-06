import service from '../utils/request'

export function getConfig(key) {
  return service.get(`/site/config/${key}`)
}

export function setConfig(key, value) {
  return service.put('/site/config', { key, value })
}

export function login(data) {
  return service.post('/user/login', data)
}

export function getUserInfo() {
  return service.get('/user/info')
}

export function logout() {
  return service.delete('/user/logout')
}

export function getNeedRefreshToken() {
  return service.get('/user/token/refresh')
}

export function refreshToken() {
  return service.put('/user/token/refresh')
}

export function getUserRole() {
  return service.get('/user/role')
}
