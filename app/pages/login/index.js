import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { Button, InputItem, List, Picker } from '@ant-design/react-native'
import { connect } from 'react-redux'
import { loginService } from '@/services';
import asyncStorage from '@react-native-community/async-storage'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password: '111111',
      ip: 'http://192.168.1.103:13212',
      // ip:'http://192.168.43.99:8081',
      windows: [],
      windowId: null,
      WindowType: "PreparationWindow"
    };
  }

  login() {
    const { username, password } = this.state;
    const { dispatch } = this.props;
    const req = {
      username,
      password,
      windowId: this.state.windowId[0],
      windowType:'Dispensingwindow'
    }
    dispatch({ type: 'login/login', payload: req })
  }

  componentDidMount() {
    // this.getAllWindows()
    asyncStorage.setItem('baseUrl',this.state.ip)
  }

  onChange = value => {
    this.setState({
      windowId:value,
    });
  }

  onPress = () => {
    asyncStorage.setItem('baseUrl', this.state.ip)
    setTimeout(() => {
      this.getAllWindows()
    }, 200);
  }

  getAllWindows = async () => {
    const { Status, Data } = await loginService.getAllWindows()
    if (Status == 200) {
      const windows = [];
      Data.forEach(v => {
        if (v.WindowType == 1) {
          // console.log(v);
          const item = {
            value: v.WindowId,
            label: v.WindowName,
          };
          windows.push(item);
        }
      });
      this.setState({
        windows,
      });
    }
  }

  render() {
    const { loginloading } = this.props;
    const { windows, windowId } = this.state
    return (
      <ImageBackground
        style={{flex: 1}}
        source={require('@/assets/images/loginbg.jpg')}>
        <TouchableWithoutFeedback style={{flex: 1}}>
          <View style={styles.containerStyle}>
            <View style={styles.main}>
              <List>
                <InputItem
                  clear
                  placeholder={'用户名: admin'}
                  value={this.state.username}
                  key="username"
                  onChange={value => {
                    this.setState({
                      username: value,
                    });
                  }}
                />
                <InputItem
                  type={'password'}
                  key="password"
                  placeholder={'密码: 12345678'}
                  value={this.state.password}
                  onChange={value => {
                    this.setState({
                      password: value,
                    });
                  }}
                />
                <InputItem
                  placeholder={'主机地址'}
                  key="ip"
                  value={this.state.ip}
                  onChange={value => {
                    this.setState({
                      ip: value,
                    });
                  }}
                />
                {/* <PickerView
                  onChange={this.onChange}
                 
                  cascade={false}
                /> */}
                <Picker
                  cols={1}
                  value={windowId}
                  data={windows}
                  onChange={this.onChange}>
                  <List.Item arrow="horizontal" onPress={this.onPress} key="window">
                    选择窗口
                  </List.Item>
                </Picker>
              </List>
              <Button
                loading={loginloading}
                type="primary"
                size={'large'}
                style={{marginTop: 16}}
                // eslint-disable-next-line react-native/no-inline-styles
                onPress={() => {
                  this.login();
                }}>
                登陆
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    width: 320,
    height: 320
  }
});

function mapStateToProps({ login, loading }) {
  return {
    login,
    loginloading: loading.effects['login/login']
  }
}
export default connect(mapStateToProps)(LoginPage);