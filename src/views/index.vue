<route lang="yaml">
name: home
meta:
  title: 主页
</route>

<script lang="ts" setup>

import { onMounted } from 'vue'
import { init } from 'echarts'
import moment from 'moment'
import { reqGetDataNodeInfo } from '@/api'

const data: Array<any> = []
const data1: Array<String> = []
const data2: Array<number> = []
const data3: Array<number> = []

async function getNodeInfo() {
  let result = {
    totalAlive: '',
    utilization: '',
  }
  result = await reqGetDataNodeInfo()
  data1.push(moment().format('hh:mm:ss'))
  data2.push(Number(result.totalAlive))
  data3.push(Number(result.utilization))
  // console.log(data1)
  // console.log(data2)
}
function drawChart1(data1, data2) {
  // 使用里面的配置项和数据显示图表。
  // const chartEle1: HTMLElement = document.getElementById('chart1') as HTMLElement
  // const chart1 = init(chartEle1)
  // const option1: {
  //   yAxis: {
  //     lineStyle: { color: string; width: number; type: string }
  //     max: number
  //     name: string
  //     show: boolean
  //     type: string
  //   }[]
  //   xAxis: { data: any[]; type: string }
  //   color: string
  //   legend: { data: string[] }
  //   grid: { containLabel: boolean }
  //   series: {
  //     areaStyle: {}
  //     data: any[]
  //     lineStyle: { width: number; type: string }
  //     name: string
  //     type: string
  //     yAxisIndex: number
  //   }[]
  //   tooltip: { trigger: string }
  //   title: { text: string }
  // } = {
  //   // 图表标题
  //   title: {
  //     text: '结点状况',
  //   },
  //   color: '#3232CD',
  //   tooltip: {
  //     trigger: 'axis',
  //   },
  //   legend: {
  //     data: ['结点数量'],
  //   },
  //   grid: {
  //     containLabel: true,
  //   },
  //   // toolbox: {
  //   //   feature: {
  //   //     saveAsImage: {},
  //   //   },
  //   // },
  //   xAxis: {
  //     type: 'category',
  //     data: [],
  //   },
  //   yAxis: [
  //     {
  //       name: '结点数量',
  //       type: 'value',
  //       max: 5,
  //       show: true,
  //       lineStyle: {
  //         color: 'black',
  //         width: 2,
  //         type: 'solid',
  //       },
  //     },
  //   ],
  //   series: [
  //     {
  //       name: '结点数量',
  //       type: 'line',
  //       yAxisIndex: 0, // 右轴
  //       data: [],
  //       lineStyle: {
  //         width: 2,
  //         type: 'solid',
  //       },
  //       areaStyle: {},
  //     },
  //   ],
  // }
  // option1.xAxis.data = data1
  // option1.series[0].data = data2
  // option1 && chart1.setOption(option1)
}
function drawChart2(data1, data3) {
  // const chartEle2: HTMLElement = document.getElementById('chart2') as HTMLElement
  // const chart2 = init(chartEle2)
  // const option2: {
  //   yAxis: {
  //     areaStyle: {}
  //     lineStyle: { color: string; width: number; type: string }
  //     max: number
  //     name: string
  //     show: boolean
  //     type: string
  //   }[]
  //   xAxis: { data: any[]; type: string }
  //   color: string
  //   legend: { data: string[] }
  //   grid: { containLabel: boolean }
  //   series: {
  //     data: any[]
  //     lineStyle: { width: number; type: string }
  //     name: string
  //     type: string
  //     yAxisIndex: number
  //   }[]
  //   tooltip: { trigger: string }
  //   title: { text: string }
  // } = {
  //   title: {
  //     text: '存储利用率',
  //   },
  //   color: '#3232CD',
  //   tooltip: {
  //     trigger: 'axis',
  //   },
  //   legend: {
  //     data: ['利用率'],
  //   },
  //   grid: {
  //     containLabel: true,
  //   },
  //   // toolbox: {
  //   //   feature: {
  //   //     saveAsImage: {},
  //   //   },
  //   // },
  //   xAxis: {
  //     type: 'category',
  //     data: [],
  //   },
  //   yAxis: [
  //     {
  //       name: '利用率',
  //       type: 'value',
  //       max: 1,
  //       show: true,
  //       lineStyle: {
  //         color: 'black',
  //         width: 2,
  //         type: 'solid',
  //       },
  //       areaStyle: {},
  //     },
  //   ],
  //   series: [
  //     {
  //       name: '利用率',
  //       type: 'line',
  //       yAxisIndex: 0, // 右轴
  //       data: [],
  //       lineStyle: {
  //         width: 2,
  //         type: 'solid',
  //       },
  //     },
  //   ],
  // }
  // option2.xAxis.data = data1
  // option2.series[0].data = data3
  // option2 && chart2.setOption(option2)
}
// onMounted(() => {
//   let timer = null
//   // 每5s刷新数据
//   timer = setInterval(() => {
//     getNodeInfo()
//     if (data1.length > 5) {
//       data1.splice(0, 1)
//     }
//     if (data2.length > 5) {
//       data2.splice(0, 1)
//     }
//     if (data3.length > 5) {
//       data3.splice(0, 1)
//     }
//     // 获取dom元素,图表初始化
//     drawChart1(data1, data2)
//     drawChart2(data1, data3)
//   }, 3000)
//   function getTime() {
//     const time = new Date()
//     return time.toLocaleString()
//   }
// })
</script>

<template>
  <div>
    <page-header title="欢迎使用 高置信的密文数据完整性验证工具集">
      <template #content>
        <div>
        </div>
      </template>
    </page-header>
  </div>
</template>

<style lang="scss" scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}
#chart1 {
  width: 300px;
  height: 330px;
}
#chart2 {
  width: 280px;
  height: 330px;
}
#chart3 {
  width: 280px;
  height: 350px;
}
//#chart4 {
//  width: 300px;
//  height: 350px;
//}
//#chart5 {
//  width: 300px;
//  height: 350px;
//}
.icon{
  height: 15%;
  width: 15%;
}
.ecology {
  padding: 10px 0 0;

  &.vue {
    h1 {
      color: #41b883;
    }
  }

  &.fa {
    h1 {
      color: #e60000;
    }
  }

  &.osa {
    h1 {
      color: #67c23a;
    }
  }

  .main {
    text-align: center;

    img {
      display: block;
      margin: 0 auto;
    }

    h1 {
      margin: 10px auto 0;
      text-align: center;
    }

    h2 {
      font-size: 16px;
      font-weight: normal;
      color: var(--el-text-color-secondary);
      text-align: center;
    }
  }

  .el-carousel {
    box-shadow: var(--el-box-shadow-light);
    transition: var(--el-transition-box-shadow);
  }

  ul li {
    line-height: 28px;
  }
}

.question {
  .answer {
    margin: 20px 0 0;
    padding-left: 20px;
    font-size: 16px;
    color: var(--el-text-color-secondary);

    li {
      margin-bottom: 10px;
      line-height: 1.5;

      &:last-child {
        margin-bottom: 0;
      }
    }

    span {
      color: var(--el-text-color-primary);
      font-weight: bold;
    }
  }
}
</style>
