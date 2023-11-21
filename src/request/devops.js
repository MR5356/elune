import service from '../utils/request'

export function listScript() {
  return service.get('/script/list')
}

export function addScript(data) {
  return service.post('/script/add', data)
}

export function deleteScript(id) {
  return service.delete(`/script/delete/${id}`)
}

export function updateScript(data) {
  return service.put('/script/update', data)
}
