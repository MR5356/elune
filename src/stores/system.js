import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', () => {
  const userInfo = ref({})
  return { userInfo }
})
