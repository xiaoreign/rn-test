import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import { WingBlank } from '@ant-design/react-native'
import { connect } from 'react-redux'
import moment from 'moment'

class ExpenseDetail extends Component {

  renderType(type) {
    switch (type) {
      case 1:
        return '参赛'
      case 2:
        return ''
      case 3:
        return ''
      case 4:
        return ''
      case 5:
        return ''
    }
  }

  renderStatus(status) {
    switch (status) {
      case 0:
        return '正常支付'
      case 1:
        return '系统退回'
      case 2:
        return ''
      case 3:
        return '人工退回'
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

export default connect(mapStateToProps)(ExpenseDetail)