import React, { Component } from 'react'
import { View, Dimensions,StyleSheet } from 'react-native'
import { WingBlank, Flex , Button} from '@ant-design/react-native';
import asyncStorage from '@react-native-community/async-storage'
import NavigationService from '@/utils/navigation'

export default class Setting extends Component {

    logout = ()=>{
        asyncStorage.clear();
        NavigationService.navigate('Auth');
    }
    render() {
        return (
          <WingBlank>
            <Flex justify="center">
              <Flex.Item>
                <View style={styles.logout}>
                            <Button type="primary" onPress={this.logout}>登出</Button>
                </View>
              </Flex.Item>
            </Flex>
          </WingBlank>
        );
      }
}

const styles = StyleSheet.create({
    logout: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }
  });