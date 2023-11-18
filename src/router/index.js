import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('../layouts/FrameworkLayout.vue'),
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
          path: 'setting',
          name: 'setting',
          component: () => import('../views/SettingView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
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

export default router
