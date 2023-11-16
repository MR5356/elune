import { getConfig } from '@/request/app'

function initSetting(setting) {
  for (const key in setting.value) {
    getConfig(key).then((res) => {
      if (res) {
        if (key === 'title') {
          document.title = res
        }
        if (key === 'favicon') {
          document.querySelector('link[rel="icon"]').href = res
        }
        if (key === 'menus') {
          setting.value[key] = JSON.parse(res)
        } else {
          setting.value[key] = res
        }
      }
    })
  }
  return setting.value
}

export default initSetting
