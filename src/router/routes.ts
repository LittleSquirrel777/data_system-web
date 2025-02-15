import Encryption from "./modules/encryption";
import { setupLayouts } from 'virtual:meta-layouts'
import generatedRoutes from 'virtual:generated-pages'
import type { RouteRecordRaw } from 'vue-router'
import MultilevelMenuExample from './modules/multilevel.menu.example'
import BreadcrumbExample from './modules/breadcrumb.example'
import Search from './modules/search'
import Audit from './modules/audit'
import type { Route } from '#/global'
import useSettingsStore from '@/store/modules/settings'

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: () => useSettingsStore().settings.home.title,
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/index.vue'),
        meta: {
          title: () => useSettingsStore().settings.home.title,
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
      {
        path: 'setting',
        name: 'personalSetting',
        component: () => import('@/views/personal/setting.vue'),
        meta: {
          title: '个人设置',
          cache: 'personalEditPassword',
        },
      },
      {
        path: 'edit/password',
        name: 'personalEditPassword',
        component: () => import('@/views/personal/edit.password.vue'),
        meta: {
          title: '修改密码',
        },
      },
    ],
  },
]

// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '检索完整性验证',
      icon: 'sidebar-default',
    },
    children: [
      Search,
    ],
  },
  {
    meta: {
      title: '计算正确性验证',
      icon: 'ep:grid',
    },
    children: [
      Encryption,
    ],
  },
  {
    meta: {
      title: '存储完整性验证',
      icon: 'sidebar-default',
    },
    children: [
      Audit,
    ],
  },
  // {
  //   path: 'search',
  //   name: 'search',
  //   component: () => import('@/views/search/search.vue'),
  //   meta: {
  //     title: '检索',
  //     // icon: 'el-icon-s-check'
  //   },
  // },
  // {
  //   path: 'encryption',
  //   name: 'encryption',
  //   beforeEnter() {
  //     // 直接跳转，无需加载组件
  //     window.location.href = 'http://127.0.0.1:3000';
  //   },
  //   component: () => import('@/views/EncCompute/audit.vue'),
  //   meta: {
  //     title: '加密',
  //     // icon: 'el-icon-s-check'
  //   },
  // },
  // {
  //   path: 'audit',
  //   name: 'audit',
  //   component: () => import('@/views/audit/audit.vue'),
  //   meta: {
  //     title: '审计',
  //     // icon: 'el-icon-s-check'
  //   },
  // }
]

const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant === true
})

const asyncRoutesByFilesystem = setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
}))

export {
  constantRoutes,
  systemRoutes,
  asyncRoutes,
  constantRoutesByFilesystem,
  asyncRoutesByFilesystem,
}
