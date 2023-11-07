import service from '../utils/request'

export function getBlogDetail(id) {
  return service.get(`/blog/${id}`)
}
