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

export function addMachine(data) {
  return service.post('/machine/add', data)
}

export function deleteMachine(id) {
  return service.delete(`/machine/delete/${id}`)
}

export function updateMachine(data) {
  return service.put('/machine/update', data)
}

export function listMachine() {
  return service.get('/machine/list')
}

export function addMachineGroup(data) {
  return service.post('/machine/group/add', data)
}

export function deleteMachineGroup(id) {
  return service.delete(`/machine/group/delete/${id}`)
}

export function updateMachineGroup(data) {
  return service.put('/machine/group/update', data)
}

export function listMachineGroup() {
  return service.get('/machine/group/list')
}

export function startNewJob(data) {
  return service.post('/execute/new', data)
}

export function stopJob(id) {
  return service.delete(`/execute/stop/${id}`)
}

export function getJobLog(id) {
  return service.get(`/execute/log/${id}`)
}

export function listJob() {
  return service.get('/execute/list')
}
