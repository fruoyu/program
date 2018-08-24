import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

class DataPicker extends Component {

  // 日历操作
  onChangeFn = (date, dateString) => {
    this.props.clientList.endTime = dateString[0]
    this.props.clientList.startTime = dateString[1]
    // this.onGetClientList()
  }
  render() {
    return (
      <div className="search-calendar">
        <div className="form-group d_t_dater">
          <div className="col-sm-12">
            <div className="input-group">
              <RangePicker onChange={this.onChangeFn} />
            </div>
          </div>
        </div>
      </div>
    )
  }
 
}

export default connect(({ clientList }) => ({ clientList }))(DataPicker);