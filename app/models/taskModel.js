import {taskService} from '@/services';
import { Toast, Portal } from '@ant-design/react-native';

export default {
  // model在store中的名称
  namespace: 'task',
  state: {
    // state初始值
    newTask: {}
  },
  // 同步方法
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  },
  // 异步方法
  effects: {
    *getList({ payload }, { call, put }) {
      const key = Toast.loading('Loading...', 5);
      const {Status} = yield call(taskService.getList, payload);
      if (Status === 200) {
        Portal.remove(key)
      }
    },
    *startTask({ payload }, { call, put }) {
      yield call(taskService.startTask, payload);
    },
  },
};
