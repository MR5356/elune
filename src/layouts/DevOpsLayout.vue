<script setup>
import FrameworkLayout from '@/layouts/FrameworkLayout.vue'

const menus = [
  // {
  //   title: '概览',
  //   icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/></svg>`,
  //   path: '/devops'
  // },
  // {
  //   title: '集群管理',
  //   icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43 4H5C4.44772 4 4 4.48842 4 5.09091V14.9091C4 15.5116 4.44772 16 5 16H43C43.5523 16 44 15.5116 44 14.9091V5.09091C44 4.48842 43.5523 4 43 4Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M43 32H5C4.44772 32 4 32.4884 4 33.0909V42.9091C4 43.5116 4.44772 44 5 44H43C43.5523 44 44 43.5116 44 42.9091V33.0909C44 32.4884 43.5523 32 43 32Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linejoin="round"/><path d="M14 16V24.0083L34 24.0172V32" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 38H30" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 10H30" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   path: '/devops/cluster'
  // },
  {
    title: '主机管理',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="32" width="10" height="9" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="5" y="8" width="38" height="24" rx="2" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M22 27H26" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 41L34 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    path: '/devops/machine'
  },
  // {
  //   title: '应用商店',
  //   icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M28 13L21.5 24L19.875 26.75L19.0625 28.125" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 35L15.8125 33.625" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 29L23 29" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 29H36" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 13L22.5 18.5L23.375 19.875" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M33 35L29.5 29.5L27.75 26.75L26.875 25.375" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   path: '/devops/apps'
  // },
  // {
  //   title: '备份管理',
  //   path: '/blog',
  //   icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 8V20C22 22.2091 17.9706 24 13 24C8.02944 24 4 22.2091 4 20V8" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 14C22 16.2091 17.9706 18 13 18C8.02944 18 4 16.2091 4 14" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 8C22 10.2091 17.9706 12 13 12C8.02944 12 4 10.2091 4 8C4 5.79086 8.02944 4 13 4C17.9706 4 22 5.79086 22 8Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 28V40C44 42.2091 39.9706 44 35 44C30.0294 44 26 42.2091 26 40V28" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 34C44 36.2091 39.9706 38 35 38C30.0294 38 26 36.2091 26 34" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 28C44 30.2091 39.9706 32 35 32C30.0294 32 26 30.2091 26 28C26 25.7909 30.0294 24 35 24C39.9706 24 44 25.7909 44 28Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 6H38C40.2091 6 42 7.79086 42 10V16" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 42H10C7.79086 42 6 40.2091 6 38V32" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   children: [
  //     {
  //       title: '备份策略',
  //       path: '/devops/about1'
  //     },
  //     {
  //       title: '备份列表',
  //       path: '/blog/backup-list'
  //     },
  //     {
  //       title: '备份插件',
  //       path: '/blog/backup-detail'
  //     }
  //   ]
  // },
  {
    title: '脚本管理',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 40H7C5.34315 40 4 38.6569 4 37V11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V25.8824" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M34 33L30 37L34 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 33L44 37L40 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)" fill="#FFF"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)" fill="#FFF"/></svg>`,
    path: '/devops/script'
    // children: [
    //   {
    //     title: '脚本列表',
    //     icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 40H7C5.34315 40 4 38.6569 4 37V11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V25.8824" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M34 33L30 37L34 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 33L44 37L40 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)" fill="#FFF"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)" fill="#FFF"/></svg>`,
    //     path: '/devops/script'
    //   },
    //   {
    //     title: '脚本执行器',
    //     icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 40H7C5.34315 40 4 38.6569 4 37V11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V25.8824" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11C4 9.34315 5.34315 8 7 8H41C42.6569 8 44 9.34315 44 11V20H4V11Z" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M34 33L30 37L34 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 33L44 37L40 41" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 10 14)" fill="#FFF"/><circle r="2" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 16 14)" fill="#FFF"/></svg>`,
    //     path: '/devops/executor'
    //   }
    // ]
  },
  {
    title: '备份还原',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 8V20C22 22.2091 17.9706 24 13 24C8.02944 24 4 22.2091 4 20V8" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 14C22 16.2091 17.9706 18 13 18C8.02944 18 4 16.2091 4 14" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 8C22 10.2091 17.9706 12 13 12C8.02944 12 4 10.2091 4 8C4 5.79086 8.02944 4 13 4C17.9706 4 22 5.79086 22 8Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 28V40C44 42.2091 39.9706 44 35 44C30.0294 44 26 42.2091 26 40V28" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 34C44 36.2091 39.9706 38 35 38C30.0294 38 26 36.2091 26 34" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 28C44 30.2091 39.9706 32 35 32C30.0294 32 26 30.2091 26 28C26 25.7909 30.0294 24 35 24C39.9706 24 44 25.7909 44 28Z" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 6H38C40.2091 6 42 7.79086 42 10V16" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 42H10C7.79086 42 6 40.2091 6 38V32" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    path: '/devops/backup'
  },
  {
    title: '计划任务',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="28" r="16" fill="#6abaf3" stroke="#333" stroke-width="2"/><path d="M28 4L20 4" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 4V12" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 16L38 13" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 28V22" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 28H18" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    path: '/devops/cron',
    children: [
      {
        title: '计划任务列表',
        path: '/devops/cron'
      },
      {
        title: '计划任务日志',
        path: '/devops/cron-log'
      }
    ]
  }
]
if (process.env.NODE_ENV === 'development') {
  menus.push({
    title: '迁移工具',
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="13.7146" cy="13.7141" r="6.85714" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="34.2859" cy="34.2854" r="6.85714" fill="#6abaf3" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24.001 44C12.9553 44 4.00098 35.0457 4.00098 24L10.6676 27.3333" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24.001 4C35.0467 4 44.001 12.9543 44.001 24L37.3343 20.6667" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    path: '/devops/backup',
    children: [
      {
        title: '容器镜像迁移',
        path: '/devops/about1'
      },
      {
        title: '代码仓库迁移',
        path: '/devops/about1'
      }
    ]
  })
}
</script>

<template>
  <FrameworkLayout :menus="menus" />
</template>

<style scoped></style>
