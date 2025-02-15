import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/EncCompute',
  // component: Layout,
  component: () => import('@/views/EncCompute/jump.vue'),
  // redirect: '/EncCompute',
  name: 'encryption',
  meta: {
    title: '计算正确性验证',
    icon: 'ep:lock',
  },
  // children: [
  //   {
  //     path: 'arithmetic',
  //     name: 'com_arithmetic',
  //     component: () => import('@/views/EncCompute/jump.vue'),
  //     meta: {
  //       title: '算数电路',
  //     },
  //   },
  //   {
  //     path: 'boolean',
  //     name: 'com_boolean',
  //     component: () => import('@/views/EncCompute/boolean.vue'),
  //     meta: {
  //       title: '布尔电路',
  //     },
  //   },
  //   {
  //     path: 'yaos',
  //     name: 'com_yaos',
  //     component: () => import('@/views/EncCompute/yaos.vue'),
  //     meta: {
  //       title: '姚氏电路',
  //     },
  //   },
  //   {
  //     path: 'homomorphic',
  //     name: 'com_homomorphic',
  //     component: () => import('@/views/EncCompute/homomorphic.vue'),
  //     meta: {
  //       title: '同态加密',
  //     },
  //   },
  //   {
  //     path: 'testcase',
  //     name: 'com_testcase',
  //     component: () => import('@/views/EncCompute/testcase.vue'),
  //     meta: {
  //       title: '测试用例',
  //     },
  //   },
  // ],
}

export default routes
