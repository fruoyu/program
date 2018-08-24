import React, { Component } from 'react';
import { connect } from 'dva';
import { Scrollbars } from 'react-custom-scrollbars';
import { Cascader } from 'antd';
import $ from 'jquery';

import { CommonHeader } from '../../components';
import DatePicker from './DatePicker';
import DataList from './DataList';

import './clientList.less';

class ClientList extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchInputVal:'',
      name: '',
      endTime: '', // 结束时间
      fileName: '', // 录音文件名称
      pageNum: 1, // 当前页数
      pageSize: 10, // 请求数
      startTime: '', // 开始时间
      status: '',
    };

    this.onGetClientList = this.onGetClientList.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  componentDidMount(){
    // this.onGetClientList();
    this.setPaginationTotalNum();
  }

  /**
   * 获取客户列表信息
   * 因为接口还没出，下面会报错
   * 所有数据均为模拟
   */
  onGetClientList = () => {
    this.props.dispatch({
      type: 'clientList/getClientList',
      payload: {
        endTime: this.state.endTime,
        pageNum: this.state.pageNum - 1,
        pageSize: this.state.pageSize,
        startTime: this.state.startTime,
        status: this.state.status,
      }
    })
  }

  // 日历操作
  onChangeFn = (date, dateString) => {
    this.setState({
      endTime: dateString[0],
      startTime: dateString[1]
    })

    // 日期选择之后请求客户信息
    // this.onGetClientList()
  }

  // 级联下拉菜单
  onSelectChange = (val, d) => {
    // console.log(val,d)

    // 选择之后请求下客户信息列表
    // this.onGetClientList()
  }

  // 客户信息列表分页设置文字 ‘共*页’ 位置
  setPaginationTotalNum = () => {
    let aLi = $('.clientListWrap li'),
      tarLi = null,posLi = null;
    aLi.map((i, itm) => {
      let item = $(itm);
      if(item.hasClass('ant-pagination-next')) posLi = item;
      if(item.hasClass('ant-pagination-total-text')) tarLi = item;
    })
    tarLi.insertAfter(posLi);
  }

  onSearchClick = (ev) => {
    console.log(this.state.searchInputVal)
  }

  render() {

    // 级联菜单数据模拟
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

    // 客户信息列表模拟
    // const { mClientList } = this.props.clientList;
    // const dataSource = mClientList.dataSource;
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      phone: 12323132131,
      star: '三星',
      fiveStatus: '已认购',
      updateTime: '2018-08-21 13:35:24',
      belong: '张三'
    }, {
      key: '2',
      name: '胡彦祖',
      phone: 214135125151,
      star: '四星',
      fiveStatus: '未认购',
      updateTime: '2018-08-21 13:35:24',
      belong: '张四'
    }, {
      key: '3',
      name: '胡彦祖1',
      phone: 214135125151,
      star: '四星',
      fiveStatus: '未认购',
      updateTime: '2018-08-21 13:35:24',
      belong: '张四'
    }, {
      key: '4',
      name: '胡彦祖2',
      phone: 2141351251512,
      star: '四星',
      fiveStatus: '未认购',
      updateTime: '2018-08-21 13:35:24',
      belong: '张四'
    }, {
      key: '5',
      name: '胡彦祖3',
      phone: 2141351251512,
      star: '四星',
      fiveStatus: '未认购',
      updateTime: '2018-08-21 13:35:24',
      belong: '张四'
    }];
    
    return (
      <div className="bootContent historyContent clientCotent" >
        <Scrollbars style={{ flex: 1 }} autoHide>

          {/* 头部信息 */}
          <CommonHeader title="客户列表" isMain customer isUserPort />
          <div id="content">
            <div className="content-head">
              <div className="ch-top">

              {/* Filter part start */}
                <div className="search-input">
                  <input
                    type="text" placeholder="搜索内容"
                    onChange={(e) => {
                      if( e.target.value !== '') this.setState({
                        searchInputVal: e.target.value
                      });
                    }}
                  />
                  <span className="iconfont icon-qianwang" onClick={this.onSearchClick} />
                </div>

                {/* 下拉菜单 */}
                  <Cascader options={options} onChange={this.onSelectChange} placeholder="Please select" />

                {/* 日历 */}
                <DatePicker onChangeFn={this.onChangeFn} />

              {/* Filter part end */}
              </div>
            </div>


          {/* 列表内容部分 */}
            <DataList dataSource={dataSource} />

          </div>
        </Scrollbars>
      </div>
    )
  }

}

export default connect(({ clientList }) => ({ clientList }))(ClientList);
