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

export function pageJob(pageSize, pageNum) {
  return service.get('/execute/list/page?pageSize=' + pageSize + '&pageNum=' + pageNum)
}

export function listCron() {
  return service.get('/cron/list')
}

export function addCron(data) {
  return service.post('/cron/add', data)
}

export function deleteCron(id) {
  return service.delete(`/cron/delete/${id}`)
}

export function enableCron(id) {
  return service.put(`/cron/enable/${id}`)
}

export function disableCron(id) {
  return service.put(`/cron/disable/${id}`)
}

export function pageCronRecord(pageSize, pageNum) {
  return service.get(`/cron/record?pageSize=${pageSize}&pageNum=${pageNum}`)
}

export function listKubernetes() {
  return service.get('/kubernetes/list')
}

export function addKubernetes(data) {
  return service.post('/kubernetes/add', data)
}

export function deleteKubernetes(id) {
  return service.delete(`/kubernetes/delete/${id}`)
}

export function updateKubernetes(data) {
  return service.put('/kubernetes/update', data)
}

export function addNotifierPlugin(data) {
  return service.post('/notify/plugin/add', data)
}

export function uploadNotifierPlugin(data) {
  return service.post('/notify/plugin/upload', data)
}

export function listNotifierPlugin() {
  return service.get('/notify/plugin/list')
}

export function deleteNotifierPlugin(id) {
  return service.delete(`/notify/plugin/uninstall/${id}`)
}

export function addNotifierChannel(data) {
  return service.post('/notify/channel/add', data)
}

export function listNotifierChannel() {
  return service.get('/notify/channel/list')
}

export function deleteNotifierChannel(id) {
  return service.delete(`/notify/channel/remove/${id}`)
}

export function sendNotifyMessage(id) {
  return service.post(`/notify/channel/send/${id}`)
}

export function listMessageTemplate() {
  return service.get('/notify/template/list')
}

export function addMessageTemplate(data) {
  return service.post('/notify/template/add', data)
}

export function deleteMessageTemplate(id) {
  return service.delete(`/notify/template/remove/${id}`)
}

export function updateMessageTemplate(data) {
  return service.put('/notify/template/update', data)
}
