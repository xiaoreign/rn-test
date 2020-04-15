import React, { Component } from 'react'
import moment from 'moment'
import { ListView, List } from '@ant-design/react-native'
import { connect } from 'react-redux'
import { couponService } from '@/services/index'

const ListItem = List.Item;

class Buy extends Component {
  state = {
    layout: 'list',
  };

  onFetch = async (page = 1, startFetch, abortFetch) => {
    // startFetch: (arg0: string[], arg1: number) => void,
    // abortFetch: () => void,
    try {
      //This is required to determinate whether the first loading list is all loaded.
      let pageLimit = 30;
      const { result } = await couponService.buyList({ pageNum: page, pageSize: pageLimit })
      startFetch(result.data, pageLimit)
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
    }
  };

  _toDetail(item) {
    const { dispatch, navigation } = this.props;
    dispatch({ type: 'coupon/update', payload: { detail: item } })
    navigation.navigate('BuyDetail');
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

  renderItem = (item) => {
    return (
      <ListItem
        align='top'
        arrow="horizontal"
        extra={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
        onPress={() => this._toDetail(item)}
      >
        {item.uname}
        <List.Item.Brief>
          ￥{item.price}元
        </List.Item.Brief>
        <List.Item.Brief>
          {this.renderStatus(item.status)}
        </List.Item.Brief>
      </ListItem>
    );
  };

  render() {
    return (
      <ListView
        keyExtractor={(item, index) =>
          `${this.state.layout} - ${item.id} - ${index}`
        }
        numColumns={this.state.layout === 'list' ? 1 : 3}
        onFetch={this.onFetch}
        renderItem={this.renderItem}
      />
    );
  }
}

export default connect()(Buy)