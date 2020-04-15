import axios from 'axios'
import asyncStorage from '@react-native-community/async-storage';
import { Toast, Portal } from '@ant-design/react-native';

var key = null

const request = axios.create({
  timeout: 5000
})

loadingToast = () =>{
  key = Toast.loading('Loading...', 5);
}

request.interceptors.request.use(
  async (config) => {
    // do something before request is sent
    // let userToken = await asyncStorage.getItem('userToken')
    // if (userToken) {
    //   // let each request carry token
    //   config.headers['Authorization'] = `Bearer ${userToken}`
    // } else {
    //   config.headers['Authorization'] = ''
    // }
    // this.loadingToast();
    // console.log(config);
    const baseUrl = await asyncStorage.getItem('baseUrl')
    config.baseURL = baseUrl
    config.withCredentials = true
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const data = response.data || {}
    if (data.Status !== 200) {
      // Toast.fail(data.msg)
      if (data.code === 1003) {
        asyncStorage.clear()
        // NavigationService.jumpTo('Auth')
      }
    }
    return data;
  }, err => {
    const data = err.response.data || {}
    Portal.remove(key)
    if (data.status === 401 || data.code === 1003) {
      asyncStorage.clear()
      // NavigationService.jumpTo('Auth')
    }
    // console.log('response', err)
    return Promise.reject(err)
  }
)

export default request;