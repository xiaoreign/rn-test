import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import { WingBlank } from '@ant-design/react-native'
import { connect } from 'react-redux'
import moment from 'moment'

class BuyDetail extends Component {

  renderType(type) {
    switch (type) {
      case 1:
        return ''
      case 2:
        return ''
      case 3:
        return ''
      case 4:
        return '微信'
      case 5:
        return ''
    }
  }

  renderStatus(status) {
    switch (status) {
      case 0:
        return '购买失败'
      case 1:
        return ''
      case 2:
        return '购买成功'
      case 3:
        return ''
      case 4:
        return ''
      case 5:
        return ''
    }
  }

  render() {
    const { detail } = this.props
    return (
      <ScrollView style={styles.container}>
        <WingBlank>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text style={styles.text}>用户名：</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{detail.uname}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text style={styles.text}>用户ID：</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{detail.uid}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text style={styles.text}>购买金额：</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>￥{detail.price}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text style={styles.text}>点券额度：</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{detail.money}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text style={styles.text}>支付方式：</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{this.renderType(detail.type)}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text style={styles.text}>流水号：</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{detail.id}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text style={styles.text}>购买状态：</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{this.renderStatus(detail.status)}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.label}>
              <Text style={styles.text}>购买时间：</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{moment(detail.time).format('YYYY-MM-DD HH:mm:ss')}</Text>
            </View>
          </View>
        </WingBlank>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60
  },
  label: {
    width: 100
  },
  content: {
    flex: 1
  },
  text: {
    fontSize: 16,
    color: '#333'
  }
})

function mapStateToProps({ coupon }) {
  return {
    detail: coupon.detail
  }
}

export default connect(mapStateToProps)(BuyDetail)