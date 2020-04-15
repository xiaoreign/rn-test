import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {List, Toast,Portal, Button} from '@ant-design/react-native';
import {connect} from 'react-redux';
import Empty from '@/pages/components/empty';
import {taskService} from '@/services';
import asyncStorage from '@react-native-community/async-storage';
import { Subject, Subscription } from 'rxjs';
import { auditTime, concatAll,map } from 'rxjs/operators';

const {width, height} = Dimensions.get('window');
var key = null;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, data: []};
    this.readyList = [];
    this.subject$ = new Subject;
    this.subscription$ = new Subscription
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      asyncStorage.getItem('windowId').then(v => {
        this.loading()
        this.windowId = v;
        this.getTaskList();
        this.setState({
          data: this.readyList,
        });
      });
    });
    let mapArray = []
    this.subscription$ = this.subject$
      .asObservable()
      .pipe(
        map(v => {
          mapArray.push(v);
        }),
        auditTime(5000),
      )
      .subscribe(() => {
        // console.log(mapArray)
        // for (let j = 0; j < mapArray.length; j++) {
        //   if (j.State == 6) {
        //     for (let i = 0; i < data.length; i++) {
        //       if (this.readyList[i].DispensingTaskId == j.DispensingTaskId) {
        //         this.readyList.splice(i, 1);
        //         break;
        //       }
        //     }
        //   } else if (j.State == 0) {
        //     console.log(11111)
        //     this.readyList.push(j);
        //   }
        // }
        // console.log(this.readyList)
        let { data } = this.state
        data.push(...mapArray)
        data = taskService.sortTask(data)
        this.setState({
          data:data
        })
        mapArray = [];
      });
  }

  loading = () => {
    key = Toast.loading('Loading...', 10);
  }

  getTaskList = async () => {
    const req = {
      DispensingTaskFetchMode: 1,
      StatusList: [0],
      WindowId: this.windowId,
      WindowType: 'PreparationWindow',
    };
    let { Data } = await taskService.getList(req);
    Portal.remove(key)
    this.readyList = taskService.sortTask(Data);
    this.setState({
      data: this.readyList,
      loading: false,
    });
  };

  componentWillUnmount() {
    this._navListener.remove();
    this.subscription$.unsubscribe()
  }

  refresh = () => {
    this.setState({
      loading: true,
    });
    const req = {
      DispensingTaskFetchMode: 1,
      StatusList: [0],
      WindowId: this.windowId,
      WindowType: 'DispensingWindow',
    };
    this.getTaskList(req);
  };

  UNSAFE_componentWillReceiveProps(props) {
    asyncStorage.getItem('routeName').then(v => {
      if (v == 'Home') {
        if (props.newTask) {
         this.subject$.next(props.newTask)
        }
      }
    })
      
  }

  listEmptyComponent = () => {
    return (
      <ScrollView style={styles.container}>
        <Empty />
      </ScrollView>
    );
  };
  renderItem = v => {
    const text = v.Index + '-' + v.PatientName;
    return (
      <View key={v.DispensingTaskId}>
        <Text
          style={{
            height: 44,
            lineHeight: 44,
            width: width - 10,
            marginLeft: 10,
            textAlign: 'left',
          }}>
          {text}
        </Text>
      </View>
    );
  };

  listHeaderComponent = () => {
    return this.state.data.length !== 0 ? (
      <View>
        <Text style={{alignItems: 'center', textAlign: 'center'}}>
          共{this.state.data.length}条数据
        </Text>
        {/* <Button onPress={
          this.dosubject
        }>1111</Button> */}
      </View>
    ) : null;
  };

  dosubject = () => {
    console.log('dddd')
    this.subject$.next('11111')
  }

  /*分割线*/
  separatorComponent = () => {
    return <View style={{height: 1, backgroundColor: '#ddd'}} />;
  };

  render() {
    const {data,loading} = this.state;
    if (data) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            style={{ marginTop: 20 }}
            ref="flatList"
            extraData={data}
            keyExtractor={(item, index) => String(index)}
            data={this.state.data} // 数据
            renderItem={({item}) => this.renderItem(item)} // row
            ItemSeparatorComponent={this.separatorComponent} // 分割线
            horizontal={false} // 水平还是垂直
            // ListFooterComponent={this.listFooterComponent} // 底部组件
            ListHeaderComponent={this.listHeaderComponent} // 头部组件
            ListEmptyComponent={this.listEmptyComponent} // 没有数据时显示的界面
            refreshing={this.state.loading} // 是否刷新 ，自带刷新控件
            onRefresh={() => {
              this.refresh();
            }} // 刷新方法,写了此方法，下拉才会出现  刷新控件，使用此方法必须写 refreshing
            // numColumns={3} // 指定多少列  等于 1 的时候，不能写 columnWrapperStyle
            // columnWrapperStyle={{
            //   borderWidth: 2,
            //   borderColor: 'black',
            // }} // 一整行的row设置样式
          />
          {/* <TouchableOpacity
            onPress={() => {
              this.refs.flatList.scrollToOffset({
                animated: true,
                offset: 200,
              }); // 滚动到某一个位置
            }}>
            <Text style={{textAlign: 'center'}}>点击跳转</Text>
          </TouchableOpacity> */}
        </View>
      );
    } else {
      return null;
      Toast.fail('网络连接有误');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    backgroundColor: '#fff',
    height: 165,
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    height: 150,
  },
});

const mapStateToProps = state => {
  return {
    newTask: state.task.newTask,
  };
};
export default connect(mapStateToProps)(Home);
