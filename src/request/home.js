import service from '../utils/request'

export function getNavigation() {
  return service.get('/navigation/list')
}

export function addNavigation(data) {
  return service.post('/navigation/add', data)
}

export function updateNavigation(data) {
  return service.put('/navigation/update', data)
}

export function deleteNavigation(id) {
  return service.delete(`/navigation/delete/${id}`)
}
