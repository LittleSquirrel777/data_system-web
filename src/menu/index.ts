import MultilevelMenuExample from './modules/multilevel.menu.example'

import type { Menu } from '#/global'

const menu: Menu.recordMainRaw[] = [
  {
    meta: {
      title: '检索完整性验证',
      icon: 'sidebar-default',
    },
    children: [
      MultilevelMenuExample,
    ],
  },
]

export default menu
