import service from '../utils/request'

export function getConfig(key) {
  return service.get(`/site/config/${key}`)
}

export function setConfig(key, value) {
  return service.put('/site/config', { key, value })
}
