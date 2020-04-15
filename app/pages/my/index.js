import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Button, WingBlank, List, Flex, Accordion, Toast, Portal } from '@ant-design/react-native'
import Empty from '@/pages/components/empty';
import { taskService } from '@/services';
import { hubService } from '@/services';
import asyncStorage from '@react-native-community/async-storage';
import { Subject } from 'rxjs';

const Item = List.Item;
const Panel = Accordion.Panel
var key = null;

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId:null,
      taskDetail: null,
      activeSections: [],
      hasTask: false,
      loading: false,
      btn:false
    };
    this.readyList = [];
    this.onChange = activeSections => {
      this.setState({activeSections});
    };
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });
    this._navListener = this.props.navigation.addListener('didFocus', () => { 
      this.loading();
     asyncStorage.getItem('windowId').then(v => {
       this.windowId = v
       const req = {
        DispensingTaskFetchMode: 1,
        StatusList: [0],
        WindowId: this.windowId,
        WindowType:'PreparationWindow'
      };
      this.getListInit(req);
      });
    })
    this.initSignalr()
  }

  componentWillUnmount() {
    this._navListener.remove();
  }


  loading = () => {
    key = Toast.loading('Loading...', 10);
  }
 
  getListInit = async req => {
    let { Data } = await taskService.getList(req);
    if (Data.length > 0) {
      const sortData = taskService.sortTask(Data)
      this.getTask({ TaskId: sortData[0].DispensingTaskId });
      this.readyList = sortData
    } else {
      Portal.remove(key)
    }

  };

  getTask = async data => {
    const { Status, Data } = await taskService.getTask(data);
    if (Status === 200) {
      Portal.remove(key)
      this.setState({
        taskDetail: Data,
        btn: false,
        taskId:data.TaskId
      });
    }
  };


  startTask = async () => {
    this.setState({
      btn:true
    })
    const req = {
      TaskId: this.state.taskDetail.DispensingTaskId,
      Token: '',
    };
    taskService.startTask(req)
  };

  render() {
    const { taskDetail } = this.state;
    if (taskDetail) {
      const title = taskDetail.DispensingWindowName + '_' + taskDetail.Index;
      const patient = taskDetail.Patient;
      const taskItems = taskDetail.DispensingTaskItems;
      const renderItems = [];
      taskItems.forEach((v, index) => {
        renderItems.push(
          <Panel
            header={
              <View style={styles.panel}>
                <Flex wrap="nowrap" justify="start">
                  <Text style={styles.headerIndex} numberOfLines={1}>
                    {index + 1}
                  </Text>
                  <Flex.Item style={{paddingLeft: 4, paddingRight: 4}}>
                    <Text style={styles.headerText} numberOfLines={1}>
                      {v.MedicationName}
                    </Text>
                  </Flex.Item>
                  <Text
                    style={[styles.headerText, styles.headerSpan]}
                    numberOfLines={1}>
                    {v.OutputQty}/{v.RequestQty} ({v.MedicationSpecification})
                  </Text>
                  <Text
                    style={[styles.headerText, styles.headerhw]}
                    numberOfLines={1}>
                    {v.DeviceStorageLocationDesc}
                  </Text>
                </Flex>
              </View>
            }
            key="v.DispensingTaskItemId">
            {v.MedicationName}的详细内容
          </Panel>,
        );
      });
      return (
        <View style={styles.container}>
          <WingBlank style={styles.titleBox}>
            <Flex justify="between">
              <View>
                <Text>{title}</Text>
              </View>
              <View>
                <Text>{patient?.PatientName}</Text>
              </View>
              <View>
                <Button type="primary" onPress={this.startTask} loading={this.state.btn}>
                  开始配药
                </Button>
              </View>
            </Flex>
          </WingBlank>

          <WingBlank style={styles.container}>
            <ScrollView>
              <Accordion
                onChange={this.onChange}
                activeSections={this.state.activeSections}>
                {renderItems}
              </Accordion>
            </ScrollView>
          </WingBlank>
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <Empty />
        </ScrollView>
      );
    }
  }


  initSignalr = async() => {
    const signalrUrl = await asyncStorage.getItem('baseUrl')
    const hubServiceName = 'notificationServiceHub';
    hubService.init(hubServiceName, signalrUrl);
    this.registerEvent();
    hubService.start();
    initilized = true;
  };

  registerEvent = () => {
    let _this = this;
    function deviceStateChanged(deviceId, state) {
    }
    function taskAddedOrStatusChanged(task, lastTaskId) {
      const {dispatch} = _this.props;
      const newTask = JSON.parse(task);
      asyncStorage.getItem('routeName').then(v => {
        if (v != 'My') {
          dispatch({
            type: 'task/update',
            payload: { newTask: newTask }
          });
        }
      })
      _this.readyList.push(newTask)
      if (newTask.State == 6) {
        for (let i = 0; i < _this.readyList.length; i++){
          if (_this.readyList[i].DispensingTaskId == newTask.DispensingTaskId) {
            _this.readyList[i].State = newTask.State
            break;
          }
        }
      }
      _this.readyList = taskService.sortTaskByState(_this.readyList, 0)
      if (_this.readyList[0].DispensingTaskId != _this.state.taskId) {
        const req = {
          TaskId: _this.readyList[0].DispensingTaskId
        }
        _this.getTask(req);
      }
      ackTask(_this.windowId, newTask.DispensingTaskId, newTask.State);
    }

    function ackTask(windowId, taskId, taskState) {
      try {
        hubService.callHubService(
          ['AckTask', windowId, taskId, taskState],
          () => { },
          () => console.log(`[AckTask]Fail`),
        );
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    hubService.registerHubProxyEvent(deviceStateChanged);
    hubService.registerHubProxyEvent(taskAddedOrStatusChanged);
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleBox: {
    height: 30,
    margin: 20
  },
  avatar: {
    fontSize: 28,
    color: '#fff'
  },
  username: {
    fontSize: 20
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    padding: 10,
    textAlign:'left'
  },
  headerIndex: {
    fontSize: 16,
    fontWeight: '500',
    padding: 10,
    textAlign: 'left',
    width:40
  },
  headerSpan: {
    width:180
  },
  headerhw: {
    width:100
  },
  panel: {
    flexGrow: 1,
    flexShrink: 1
  },
  empty: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center'
  },
  emptyFont: {
    fontSize:25,
  }
})

const mapStateToProps = state => {
  return {
    // task: state.task.firstTask,
  };
};

export default connect(mapStateToProps)(My);

