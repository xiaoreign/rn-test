import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, FlatList, Text} from 'react-native';
import {WingBlank, Button} from '@ant-design/react-native';
import asyncStorage from '@react-native-community/async-storage';
import NavigationService from '@/utils/navigation';
import RNFS from 'react-native-fs';
const {width, height} = Dimensions.get('window');

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.readDir();
  }

  logout = () => {
    asyncStorage.clear();
    NavigationService.navigate('Auth');
  };

  readDir = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(result => {
        console.log('GOT RESULT', result);
        // stat the second file，找到第二个 文件
        this.setState({
          data: result,
        });
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };

  refresh = () => {
    this.readDir();
  };

  renderItem = v => {
    return (
      <View>
        <Text
          style={{
            height: 44,
            lineHeight: 44,
            width: width - 10,
            marginLeft: 10,
            textAlign: 'left',
            backgroundColor: '#eddd',
          }}
          onPress={this.readFile.bind(this, v)}>
          {v.name}
        </Text>
        {v.showDetail ? (
          <Text
            style={{
              height: 44,
              lineHeight: 44,
              width: width - 10,
              marginLeft: 10,
              textAlign: 'left',
            }}>
            {v.detail}
          </Text>
        ) : null}
      </View>
    );
  };

  readFile = async (item) => {
    if (item.detail) {
      item.showDetail = !item.showDetail
      this.setState({
        data: this.state.data,
      });
    } else {
      const path = RNFS.DocumentDirectoryPath + '/'+ item.name;
      return RNFS.readFile(path)
        .then((result) => {
            item.showDetail  = true
          item.detail = result
          this.setState({
            data: this.state.data,
          });
          })
          .catch((err) => {
              console.log(err.message);
  
          });
  
    }

  }
  listHeaderComponent = () => {
    return (
      <Button type="primary" onPress={this.logout}>
        登出
      </Button>
    );
  };

  render() {
    const {data} = this.state;
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{marginTop: 20}}
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
  }
}

const styles = StyleSheet.create({
  logout: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'flex-end',
    textAlign: 'center',
  },
});
