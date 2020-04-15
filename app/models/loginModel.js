import asyncStorage from '@react-native-community/async-storage'
import { loginService } from '@/services'
import { Toast } from '@ant-design/react-native'
import NavigationService from '@/utils/navigation'

export default {
  // model在store中的名称
  namespace: 'login',
  state: {
    // state初始值
  },
  // 同步方法
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  // 异步方法
  effects: {
    * login({ payload }, { call, put }) {
      const { Status } = yield call(loginService.login, payload)
      if (Status === 200) {
        asyncStorage.setItem('windowId',JSON.stringify(payload.windowId))
        NavigationService.navigate('App')
      }
    },
    * logout({ payload }, { call }) {
      const { code } = yield call(loginService.logout)
      if (code === 1000) {
        Toast.success('登出成功')
        asyncStorage.clear()
        NavigationService.jumpTo('Auth')
      }
    }
  }
}