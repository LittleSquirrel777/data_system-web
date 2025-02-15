import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import useUserStore from '@/store/modules/user'

function toLogin() {
  useUserStore().logout().then(() => {
    router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined,
      },
    })
  })
}
const ip = 'http://127.0.0.1:8070'
const api = axios.create({
  baseURL: (import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true') ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})

api.interceptors.request.use(
  (request) => {
    const userStore = useUserStore()
    /**
     * 全局拦截请求发送前提交的参数
     * 以下代码为示例，在请求头里带上 token 信息
     */
    if (userStore.isLogin && request.headers) {
      request.headers.Token = userStore.token
    }
    // 是否将 POST 请求参数进行字符串化处理
    if (request.method === 'post') {
      // request.data = qs.stringify(request.data, {
      //   arrayFormat: 'brackets',
      // })
    }
    return request
  },
)

api.interceptors.response.use(
  (response) => {
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 假设返回数据格式为：{ status: 1, error: '', data: '' }
     * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
     * 请求出错时 error 会返回错误信息
     */
    if (response.data.status === 1) {
      if (response.data.error !== '') {
        // 这里做错误提示，如果使用了 element plus 则可以使用 Message 进行提示
        // ElMessage.error(options)
        return Promise.reject(response.data)
      }
    }
    // else {
    //   toLogin()
    // }
    return Promise.resolve(response.data)
  },
  (error) => {
    // let message = error.message
    // if (message === 'Network Error') {
    //   message = '后端网络故障'
    // }
    // else if (message.includes('timeout')) {
    //   message = '接口请求超时'
    // }
    // else if (message.includes('Request failed with status code')) {
    //   message = `接口${message.substr(message.length - 3)}异常`
    // }
    // ElMessage({
    //   message,
    //   type: 'error',
    // })
    // return Promise.reject(error)
  },
)

export default api
export function reqDownLoadD(params: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/hdfs/file/download/txt`,
    method: 'post',
    data: params,
  })
}
export function User(account: Object) {
  // eslint-disable-next-line no-console
  // console.log(user)

  return api({
    transformRequest: [function (account) { // 在请求之前对data传参进行格式转换
      account = qs.stringify(account)
      return account
    }],
    url: `${ip}/user/User`,
    method: 'post',
    data: account,
  })
}
export function reqDownLoadG(params: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/hdfs/file/download/pic`,
    method: 'post',
    data: params,
  })
}

export function reqDownLoadS(params: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/hdfs/file/download/space`,
    method: 'post',
    data: params,
  })
}
export function check() {
  return api.get(`${ip}/cscbf/check`, {
    timeout: 900000,
  })
}
export function Piccheck() {
  return api.get(`${ip}/image/check`, {
    timeout: 900000,
  })
}
export function reqQueryByData(data: object) {
  return api.get(`${ip}/cscbf/queryByData`, {
    timeout: 900000,
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    params: data,
  })
}
export function reqQueryByArea(data: object) {
  return api.get(`${ip}/space/queryByArea`, {
    timeout: 900000,
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    params: data,
  })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function reqQueryByImage(data) {
  return api({
    timeout: 900000,
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/image/query`,
    method: 'post',
    params: data,
  })
}
export function reqQueryByDataS(data: object) {
  return api.get(`${ip}/space/queryByData`, {
    timeout: 900000,
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    params: data,
  })
}
export function reqimgQuerytxt() {
  return api({
    url: `${ip}/crossmodel/imgQuerytxt`,
    method: 'post',
  })
}
export function reqtxtQueryimg() {
  return api({
    timeout: 900000,
    url: `${ip}/crossmodel/txtQueryimg`,
    method: 'post',
  })
}

export function reqQuerysp_time() {
  return api({
    url: `${ip}/spacetime/query`,
    method: 'post',
  })
}
export function reqGetDataNodeInfo() {
  return api.get(`${ip}/hdfs/file/getDataNodeInfo`)
}
// export function reqimgQuerytxt() {
//   return api.get('http://127.0.0.1:8070/crossmodel/imgQuerytxt2')
// }
export function reqDataBase() {
  return api.get(`${ip}/cscbf/listDatabase`)
}
export function reqcreateDataBase(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/cscbf/createDatabase`,
    method: 'post',
    data,
  })
}
export function reqremoveDataBase(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/cscbf/deleteDatabase`,
    method: 'post',
    data,
  })
}
export function reqselectDataBase(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/cscbf/selectDatabase`,
    method: 'post',
    data,
  })
}
export function reqDataBaseG() {
  return api.get(`${ip}/image/listDatabase`)
}
export function reqcreateDataBaseG(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/image/createDatabase`,
    method: 'post',
    data,
  })
}
export function reqremoveDataBaseG(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/image/deleteDatabase`,
    method: 'post',
    data,
  })
}
export function reqselectDataBaseG(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/image/selectDatabase`,
    method: 'post',
    data,
  })
}
export function reqDataBaseS() {
  return api.get(`${ip}/space/listDatabase`)
}
export function reqcreateDataBaseS(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/space/createDatabase`,
    method: 'post',
    data,
  })
}
export function reqremoveDataBaseS(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/space/deleteDatabase`,
    method: 'post',
    data,
  })
}
export function reqselectDataBaseS(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/space/selectDatabase`,
    method: 'post',
    data,
  })
}
export function reqDataBaseCross() {
  return api.get(`${ip}/crossmodel/listDatabase`)
}
export function reqcreateDataBaseCross(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/crossmodel/createDatabase`,
    method: 'post',
    data,
  })
}
export function reqremoveDataBaseCross(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/crossmodel/deleteDatabase`,
    method: 'post',
    data,
  })
}
export function reqselectDataBaseCross(data: object) {
  return api({
    transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }],
    url: `${ip}/crossmodel/selectDatabase`,
    method: 'post',
    data,
  })
}
