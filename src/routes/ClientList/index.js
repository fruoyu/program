import React, { Component } from 'react';
import { connect } from 'dva';
import { Scrollbars } from 'react-custom-scrollbars';
import { Cascader } from 'antd';
import { CommonHeader } from '../../components';
import DatePicker from './DatePicker';
import DateList from './DataList';
import './clientList.less';

class ClientList extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      endTime: '', // 结束时间
      fileName: '', // 录音文件名称
      pageNum: 1, // 当前页数
      pageSize: 10, // 请求数
      startTime: '', // 开始时间
      status: '',
    };

    this.onGetClientList = this.onGetClientList.bind(this);
  }

  componentDidMount(){
    this.onGetClientList();
  }

  /**
   * 获取客户列表信息
   */
  onGetClientList = () => {
    this.props.dispatch({
      type: 'history/getFilesList',
      // type: 'clientList/getClientList',
      payload: {
        endTime: this.state.endTime,
        fileName: this.state.fileName,
        name: this.state.name,
        pageNum: this.state.pageNum - 1,
        pageSize: this.state.pageSize,
        startTime: this.state.startTime,
        status: this.state.status,
      }
    })
  }

  onSelectChange = (val, d) => {
    console.log(val,d)
  }


  render() {
    const options = [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }];
    return (
      <div className="bootContent historyContent" >
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部信息 */}
          <CommonHeader title="客户列表" isMain isUserPort home />
          <div id="content">
            <div className="content-head">
              <div className="ch-top">
              {/* Filter part start */}
                <div className="search-input">
                  <input
                    type="text" placeholder="搜索内容"
                    onChange={(e) => {
                      // this.updataState('fileName', e.target.value.trim());
                    }}
                  />
                  <span className="iconfont icon-qianwang" />
                </div>

                {/* 下拉菜单 */}
                  <Cascader options={options} onChange={this.onSelectChange} placeholder="Please select" />
                {/* 日历 */}
                <DatePicker />

              {/* Filter part end */}
              </div>
            </div>
          
          
          {/* 列表内容部分 */}
            <DateList />

          </div>
        </Scrollbars>
      </div>
    )
  }

}

// export default connect(({ clientList }) => ({ clientList }))(ClientList);
export default connect(({ history }) => ({ history }))(ClientList);