import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/player',
      name: 'tv',
      component: () => import('../views/TVView.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/SettingView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/blog/edit/:id',
      name: 'blog-edit',
      component: () => import('../views/BlogEditView.vue')
    },
    {
      path: '/blog/editor/:id',
      name: 'blog-editor',
      component: () => import('../views/EditorView.vue')
    },
    {
      path: '/blog/read/:id',
      name: 'blog-read',
      component: () => import('../views/BlogReadView.vue')
    },
    {
      path: '/blog/:id',
      name: 'blog-detail',
      component: () => import('../views/BlogDetailView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location.href = to.fullPath
  }
})

export default router
