import React, { Component } from 'react'
import moment from 'moment'
import { ListView, List } from '@ant-design/react-native'
import { connect } from 'react-redux'
import { couponService } from '@/services/index'

const ListItem = List.Item;

class Expense extends Component {
  state = {
    layout: 'list',
  };

  onFetch = async (page = 1, startFetch, abortFetch) => {
    // startFetch: (arg0: string[], arg1: number) => void,
    // abortFetch: () => void,
    try {
      //This is required to determinate whether the first loading list is all loaded.
      let pageLimit = 30;
      const { result } = await couponService.expenseList({ pageNum: page, pageSize: pageLimit })
      startFetch(result.data, pageLimit)
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
    }
  };

  _toDetail(item) {
    const { dispatch, navigation } = this.props;
    dispatch({ type: 'coupon/update', payload: { detail: item } })
    navigation.navigate('ExpenseDetail');
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
          {item.money}点券
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

export default connect()(Expense)