import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'

const service = axios.create({
  baseURL: '/api/v1',
  timeout: 1000 * 5
})

service.interceptors.request.use(
  (config) => {
    config.headers['X-Token'] = 'token'
    return config
  },
  (error) => {
    console.log(error)
    ElMessage.error(error)
    ElLoading.service().close()
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (!res.code && res.code !== 0) {
      return res
    }

    if (res.code !== 0) {
      ElMessage.error(res.message)
      console.log('请求出错', res.message)
      ElLoading.service().close()
      return Promise.reject(new Error(res.message || '请求出错'))
    } else {
      return res.data
    }
  },
  (error) => {
    console.log(error)
    ElMessage.error(error)
    ElLoading.service().close()
    return Promise.reject(error)
  }
)

export default service
