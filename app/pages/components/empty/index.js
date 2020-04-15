import React, { Component } from 'react'
import { View, Text, Dimensions,StyleSheet,Image } from 'react-native'
import { WingBlank, Flex } from '@ant-design/react-native';

export default class Empty extends Component {
  render() {
    return (
            <WingBlank>
                <Flex justify="center">
                <Flex.Item>
                    <View style={styles.empty}>
                  <Image
                   source={require('../../../assets/images/empty.png')}
                       style={styles.imageStyle}
                    />
                    <Text style={styles.emptyFont}>暂无任务</Text>
                    </View>
                </Flex.Item>
                </Flex>
             </WingBlank>
        )
      }
}


const styles = StyleSheet.create({
  empty: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyFont: {
    fontSize: 14,
    color: '#595959'
  },
  imageStyle: {
    height: 100,
    width: 100,
    resizeMode:'contain'
  }
});

