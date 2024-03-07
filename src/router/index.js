import { createRouter, createWebHistory } from 'vue-router'
import { getUserRole } from '@/request/app'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/IndexView.vue')
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
          path: '/space',
          name: 'space',
          component: () => import('../views/SpaceView.vue')
        },
        {
          path: 'nav',
          name: 'nav',
          component: () => import('../views/NavView.vue')
        },
        {
          path: 'elune',
          name: 'elune',
          component: () => import('../views/EluneView.vue')
        },
        {
          path: '/:pathMatch(.*)',
          name: 'not-found',
          component: () => import('../views/NotFoundView.vue')
        }
      ]
    },
    {
      path: '/public/screen',
      name: 'screen',
      component: () => import('../views/ScrollScreenView.vue')
    },
    {
      path: '/devops/kubernetes',
      name: 'kubernetes',
      component: () => import('../layouts/KubernetesLayout.vue'),
      children: [
        {
          path: '',
          name: 'overview',
          component: () => import('../views/kubernetes/OverviewView.vue')
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
          path: 'terminal/:id',
          name: 'terminal',
          component: () => import('../views/TerminalView.vue')
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
          path: 'cron/list',
          name: 'cron-list',
          component: () => import('../views/CronView.vue')
        },
        {
          path: 'cron/record',
          name: 'cron-record',
          component: () => import('../views/CronRecordView.vue')
        },
        {
          path: 'notify/plugin',
          name: 'notify-plugin',
          component: () => import('../views/NotifierPluginView.vue')
        },
        {
          path: 'notify/template',
          name: 'notify-template',
          component: () => import('../views/NotifyMessageTemplateView.vue')
        },
        {
          path: 'notify/channel',
          name: 'notify-channel',
          component: () => import('../views/NotifierChannelView.vue')
        },
        {
          path: 'syncer/image',
          name: 'syncer-image',
          component: () => import('../views/devops/ImageSyncerView.vue')
        },
        {
          path: 'syncer/git',
          name: 'syncer-git',
          component: () => import('../views/devops/GitSyncerView.vue')
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
    }
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
    '/admin': ['administrators'],
    '/space': ['administrators', 'devops', 'users']
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
