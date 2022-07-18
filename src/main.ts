/*
 * @Author: xxj435 861479614@qq.com
 * @Date: 2022-06-28 23:31:42
 * @LastEditors: xxj435 861479614@qq.com
 * @LastEditTime: 2022-07-17 19:35:41
 * @FilePath: \zheye\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from '@/router'
import axios from 'axios'
const icode = 'AC7919CF07046FEF'; // 项目验证码
// 替换 baseURL
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// 下面的 icode 值是从慕课网获取的 token 值，可以在课程右侧的项目接口校验码找到
axios.interceptors.request.use(config => {
  store.commit('setLoading', true);
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode }
  }
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
