import { createRouter, createWebHistory } from 'vue-router'
import { getUserRole } from '@/request/app'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/public'
    },
    {
      path: '/public',
      name: 'public',
      component: () => import('../layouts/BasicLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          redirect: '/public/nav'
        },
        {
          path: 'nav',
          name: 'nav',
          component: () => import('../views/NavView.vue')
        }
      ]
    },
    {
      path: '/devops',
      name: 'devops',
      component: () => import('../layouts/DevOpsLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: 'apps',
          name: 'applications',
          component: () => import('../views/ApplicationView.vue')
        },
        {
          path: 'cluster',
          name: 'cluster',
          component: () => import('../views/ClusterView.vue')
        },
        {
          path: 'machine',
          name: 'machine',
          component: () => import('../views/MachineView.vue')
        },
        {
          path: 'script',
          name: 'script',
          component: () => import('../views/ScriptView.vue')
        },
        {
          path: 'backup',
          name: 'backup',
          component: () => import('../views/BackupView.vue')
        },
        {
          path: 'cron',
          name: 'cron',
          component: () => import('../views/CronView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        {
          path: 'setting',
          name: 'setting',
          component: () => import('../views/SettingView.vue')
        }
      ]
    },
    // {
    //   path: '/player',
    //   name: 'tv',
    //   component: () => import('../views/TVView.vue')
    // },
    // {
    //   path: '/blog',
    //   name: 'blog',
    //   component: () => import('../views/BlogView.vue')
    // },
    // {
    //   path: '/blog/edit/:id',
    //   name: 'blog-edit',
    //   component: () => import('../views/BlogEditView.vue')
    // },
    // {
    //   path: '/blog/editor/:id',
    //   name: 'blog-editor',
    //   component: () => import('../views/EditorView.vue')
    // },
    // {
    //   path: '/blog/read/:id',
    //   name: 'blog-read',
    //   component: () => import('../views/BlogReadView.vue')
    // },
    // {
    //   path: '/blog/:id',
    //   name: 'blog-detail',
    //   component: () => import('../views/BlogDetailView.vue')
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: '/:pathMatch(.*)',
      redirect: '/'
    }
  ]
})

router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location.href = to.fullPath
  }
})

router.beforeEach(async (to) => {
  const rules = {
    '/devops': ['administrators', 'devops'],
    '/admin': ['administrators']
  }
  for (const key in rules) {
    if (to.fullPath.startsWith(key)) {
      const res = await getUserRole()
      // 如果满足一个则为true
      for (const item of rules[key]) {
        if (res.includes(item)) {
          return true
        }
      }
      ElMessage.error('没有权限访问该页面')
      await router.push('/')
      return false
    }
  }
})

export default router
