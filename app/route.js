import React, { Component } from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from '@ant-design/react-native';
import NavigationService from '@/utils/navigation'
import asyncStorage from '@react-native-community/async-storage'

import Home from '@/pages/home';
import My from '@/pages/my';
import Login from '@/pages/login';
import AuthLoadingScreen from '@/pages/authloading';
import Setting from '@/pages/setting'
import Log from '@/pages/log'
/**
 * 配置底部标签
 */
const Tab = createBottomTabNavigator({
  My: {
    screen: My,
    navigationOptions: {
      //stackNavigator的属性
      headerTitle: '',
      gestureResponseDistance: { horizontal: 300 },
      headerBackTitle: null,
      headerStyle: { backgroundColor: '#EB3695' },//导航栏的样式
      headerTitleStyle: {//导航栏文字的样式
        color: 'white',
        //设置标题的大小
        fontSize: 16,
        //居中显示
        alignSelf: 'center'
      },
      //tab 的属性
      tabBarLabel: ' ',
      tabBarOnPress: (nav) => {
        const routeName = nav.navigation.state.routeName
        NavigationService.navigate(routeName)
        asyncStorage.setItem('routeName',routeName)
      },
      tabBarIcon: ({ tintColor }) => (
        <Image
            source={require('./assets/images/user.png')}
            style={[{ height: 24, width: 24 }, { tintColor: tintColor }]}
        />
      )
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      //stackNavigator的属性
      headerTitle: '',
      gestureResponseDistance: { horizontal: 300 },
      headerBackTitle: null,
      headerStyle: { backgroundColor: '#EB3695' },//导航栏的样式
      headerTitleStyle: {//导航栏文字的样式
        color: 'white',
        //设置标题的大小
        fontSize: 16,
        //居中显示
        alignSelf: 'center'
      },
      //tab 的属性
      tabBarLabel: ' ',
      tabBarOnPress: (nav) => {
        const routeName = nav.navigation.state.routeName
        NavigationService.navigate(routeName)
        asyncStorage.setItem('routeName',routeName)
      },
      tabBarIcon: ({ tintColor }) => (
        <Image
            source={require('./assets/images/home.png')}
            style={[{ height: 24, width: 24 }, { tintColor: tintColor }]} />
      )

    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      //stackNavigator的属性
      headerTitle: '',
      gestureResponseDistance: { horizontal: 300 },
      headerBackTitle: null,
      headerStyle: { backgroundColor: '#EB3695' },//导航栏的样式
      headerTitleStyle: {//导航栏文字的样式
        color: 'white',
        //设置标题的大小
        fontSize: 16,
        //居中显示
        alignSelf: 'center'
      },
      //tab 的属性
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Image
            source={require('./assets/images/classify.png')}
            style={[{ height: 24, width: 24 }, { tintColor: tintColor }]}
        />
      )
    }
  },
}, {
  //设置TabNavigator的位置
  tabBarPosition: 'bottom',
  //是否在更改标签时显示动画
  animationEnabled: true,
  //是否允许在标签之间进行滑动
  swipeEnabled: true,
  //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  backBehavior: "none",
  //设置Tab标签的属性

  tabBarOptions: {
    //Android属性
    upperCaseLabel: false,//是否使标签大写，默认为true
    //共有属性
    showIcon: true,//是否显示图标，默认关闭
    showLabel: true,//是否显示label，默认开启
    activeTintColor: '#EB3695',//label和icon的前景色 活跃状态下（选中）
    inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
    style: { //TabNavigator 的背景颜色
      backgroundColor: 'white',
      height: 30
    },
    indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
      height: 0
    },
    labelStyle: {//文字的样式
      fontSize: 13,
      marginTop: -20,
      marginBottom: -5
    },
    iconStyle: {//图标的样式
      marginBottom: 0
    }
  }
});

/*
 * 配置堆栈导航
 */
const Stack = createStackNavigator({
  Tab: {
    screen: Tab,
    navigationOptions: {
      headerShown: false,
      headerTitle: '首页'
    }
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: '登录'
    })
  },
  log: {
    screen: Log,
    navigationOptions: {
      title: '日志'
    }
  },
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center'
  }
});

const Drawer = createDrawerNavigator({
  Home: {
    screen: Stack,
    navigationOptions: {
      drawerLabel: '首页'
      // drawerIcon: ({ tintColor }) => (
      //   <Image
      //     source={require('./images/ic_home.png')}
      //     style={[styles.icon, { tintColor: tintColor }]}
      //   />
      // ),
    }
  },
}, {
  drawerWidth: 250, // 展示的宽度
  drawerPosition: 'left' // 抽屉在左边还是右边
  // contentOptions: {
  //     // activeTintColor: 'black',  // 选中文字颜色
  //     activeBackgroundColor: '#fff', // 选中背景颜色
  //     inactiveTintColor: '#EB3695',  // 未选中文字颜色
  //     inactiveBackgroundColor: '#fff', // 未选中背景颜色
  //     style: {  // 样式
  //
  //     }
  // },
});

const AuthStack = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: {
    screen: Drawer
  },
  Auth: {
    screen: Login,
    navigationOptions: {
      //stackNavigator的属性
      headerTitle: '登录',
      gestureResponseDistance: { horizontal: 300 },
      headerBackTitle: null,
      headerStyle: { backgroundColor: '#EB3695' },//导航栏的样式
      headerTitleStyle: {//导航栏文字的样式
        color: 'white',
        //设置标题的大小
        fontSize: 16,
        //居中显示
        alignSelf: 'center'
      },
      //tab 的属性
      tabBarLabel: '我的'
      // tabBarIcon: ({tintColor}) => (
      //     <Image
      //         source={require('./images/ic_type.png')}
      //         style={[{height: 24, width: 24}, {tintColor: tintColor}]}
      //     />
      // ),
    }
  }
}, {
  initialRouteName: 'AuthLoading'
});

const AppContainer = createAppContainer(AuthStack);

export default class App extends Component {
  render() {
    return (
      <Provider>
        <AppContainer
            ref={
              navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef)
              }
          }
        />
      </Provider>
    );
  }
}
