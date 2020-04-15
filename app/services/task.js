import request from '@/utils/request';

export function getList(data) {
  return request({
    url: 'Api/Task/GetTaskTinyList',
    method: 'post',
    data,
  });
}

export function getTask(data) {
  return request({
    url: 'Api/Task/GetTask',
    method: 'post',
    data,
  });
}

export function startTask(data) {
  return request({
    url: 'Api/Task/startTask',
    method: 'post',
    data,
  });
}

export function sortTask(data) {
  data.sort((v1, v2) => {
    if (v1.State === v2.State) {
      //先看状态
      if (v1.Priority === v2.Priority) {
        //再看优先级
        return v1.DispensingTaskId - v2.DispensingTaskId; //最后看任务号
      } else {
        return v2.Priority - v1.Priority;
      }
    } else {
      return v2.State - v1.State;
    }
  });
  return data;
}

export function filterTask(data) {
  const readyList = []
  const completeList = []
  for (let i of data) {
    if (i.State == 0) {
      readyList.push(i)
    } else if (i.State == 6) {
      completeList.push(i)
    }
  }
  return {
    readyList,
    completeList
  }
}

export function sortTaskByState(data, State) {
  const x = sortTask(data)
  const result = x.filter(v => v.State == State)
  return result
}
