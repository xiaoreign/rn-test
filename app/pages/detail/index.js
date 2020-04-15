import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Detail extends Component {
  // static navigationOptions = ({ navigation, screenProps }) => ({
  //   headerTitle: '详情',
  //   gestureResponseDistance: { horizontal: 300 },
  //   headerBackTitle: null,
  //   // headerStyle: styles.headerStyle,
  //   // headerTitleStyle: styles.headerTitleStyle,
  //   headerTintColor: 'white',
  //   headerRight: () => <View />,
  // });
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>我是首页跳转过来的页面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    color: 'black'
  },
  button: {
    width: 240,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4398ff'
  },
  headerStyle: {
    backgroundColor: '#EB3695',
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
  },
});