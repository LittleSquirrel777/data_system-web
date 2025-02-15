import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/search',
  // component: Layout,
  component: () => import('@/views/search/jump.vue'),
  // redirect: '/search_img',
  name: 'search',
  meta: {
    title: '检索完整性验证',
    icon: 'ep:search',
  },
  // children: [
  //   {
  //     path: 'img',
  //     name: 'search_img',
  //     component: () => import('@/views/search/pic.vue'),
  //     meta: {
  //       title: '图片搜索',
  //     },
  //   },
  //   {
  //     path: 'txt',
  //     name: 'search_txt',
  //     component: () => import('@/views/search/txt.vue'),
  //     meta: {
  //       title: '文本搜索',
  //     },
  //   },
  //   {
  //     path: 'space',
  //     name: 'search_space',
  //     component: () => import('@/views/search/space.vue'),
  //     meta: {
  //       title: '空间搜索',
  //     },
  //   },
  //   // {
  //   //   path: 'time_space',
  //   //   name: 'search_time_space',
  //   //   component: () => import('@/views/search/time_space.vue'),
  //   //   meta: {
  //   //     title: '时空搜索',
  //   //   },
  //   // },
  //   {
  //     path: 'cross_media',
  //     name: 'search_cross',
  //     component: () => import('@/views/search/cross_media/txt_img.vue'),
  //     meta: {
  //       title: '跨媒体搜索',
  //     },
  //     children: [
  //       {
  //         path: 'txt_img',
  //         name: 'search_txtimg',
  //         component: () => import('@/views/search/cross_media/txt_img.vue'),
  //         meta: {
  //           title: '以文搜图',
  //         },
  //       },
  //       {
  //         path: 'img_txt',
  //         name: 'search_imgtxt',
  //         component: () => import('@/views/search/cross_media/img_txt.vue'),
  //         meta: {
  //           title: '以图搜文',
  //         },
  //       },
  //     ],
  //   },
  // ],
}

export default routes
