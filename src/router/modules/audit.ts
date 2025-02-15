import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/audit',
  component: Layout,
  // component: () => import('@/views/audit/audit.vue'),
  redirect: '/audit',
  name: 'audit',
  meta: {
    title: '存储完整性验证',
    icon: 'ep:grid',
  },

  children: [
    {
      path: 'audit',
      name: 'audit',
      component: () => import('@/views/audit/audit.vue'),
      meta: {
        title: '存储完整性验证',
        // icon: 'el-icon-s-check'
      },
    },
  ],
}

export default routes
