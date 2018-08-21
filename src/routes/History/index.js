import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { routerRedux } from 'dva/router';
import './history.less';
import '../../assets/iconfont/iconfont.css';
import {
  CommonHeader,
  CommonTable,
} from '../../components';

const { RangePicker } = DatePicker;

class History extends Component {
  constructor() {
    super();
    this.state = {
      statusContent: '任务状态', // 状态选择
      name: '',
      statusList: [
        {
          key: '0',
          status: '全部',
          retCode: '',
        },
        {
          key: '1',
          status: '未完成',
          retCode: 'delete',
        },
        {
          key: '2',
          status: '已完成',
          retCode: 'done',
        },
        {
          key: '3',
          status: '分析中',
          retCode: 'analysing',
        },
      ], // 状态选择数组
      endTime: '', // 结束时间
      fileName: '', // 录音文件名称
      pageNum: 1, // 当前页数
      pageSize: 10, // 请求数
      startTime: '', // 开始时间
      status: '',
    };
    this.sendRequest = this.sendRequest.bind(this);
    this.updataState = this.updataState.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getName = this.getName.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }
  componentDidMount() {
    this.sendRequest();
    this.getName();
  }
  // 日历操作
  onChangeFn = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
      endTime: dateString[0], // 结束时间
      startTime: dateString[1], // 开始时间
    }, () => {
      this.sendRequest();
    });
  }
  // 分页器改变时接口操作
  onChangePage = (pageNumber) => {
    this.setState({
      pageNum: pageNumber,
    }, () => {
      this.sendRequest();
    });
  }
  // 获取模糊查询name列表
  getName = () => {
    this.props.dispatch({
      type: 'history/getName',
      payload: {
        name: this.state.name,
      },
    });
  }
  // 列表中完成状态
  getStatus = (status) => {
    const statusMessage = this.state.statusList.filter(item => item.retCode === status)[0].status;
    return statusMessage;
  }
  // 进入数据界面
  gotoPopup(id) {
    this.props.dispatch({
      type: 'history/saveTaskId',
      payload: {
        taskId: id,
      },
      callback: () => {
        this.props.dispatch(routerRedux.push('/popup'));
      },
    });
  }
  documentClick = (e) => {
    if ($('.trans-item-founder').attr('class').indexOf('active') > -1 && $(e.target).closest('.trans-item-founder').length === 0) {
      $('.trans-item-founder').siblings('.zhankai').removeClass('rotate');
      $('.trans-item-founder').removeClass('active');
      $('.trans-item-founder').slideUp();
    } else if ($('.trans-item-state').attr('class').indexOf('active') > -1 && $(e.target).closest('.trans-item-state').length === 0) {
      $('.trans-item-state').siblings('.zhankai').removeClass('rotate');
      $('.trans-item-state').removeClass('active');
      $('.trans-item-state').slideUp();
    }
  }
  updataState(key, data, callback) {
    let object = {};
    if (typeof (key) === 'string') {
      object[key] = data;
    } else {
      object = key;
    }
    this.setState({
      ...this.state,
      ...object,
    }, () => {
      if (typeof (key) === 'object' && data) data();
      if (typeof (key) === 'string' && callback) callback();
    });
  }
  // 请求
  sendRequest = () => {
    this.props.dispatch({
      type: 'history/getFilesList',
      payload: {
        endTime: this.state.endTime,
        fileName: this.state.fileName,
        name: this.state.name,
        pageNum: this.state.pageNum - 1,
        pageSize: this.state.pageSize,
        startTime: this.state.startTime,
        status: this.state.status,
      },
    });
  }
  // 进入画像界面操作
  gotoUserPortrait = (id) => {
    this.props.dispatch({
      type: 'history/saveTaskId',
      payload: {
        taskId: id,
      },
      callback: () => {
        this.props.dispatch(routerRedux.push('/userPortrait'));
      },
    });
  }
  render() {
    const {
      filesList,
      nameList,
    } = this.props.history;
    const tabHead = ['录音名称', '销售人员', '任务状态', '上传时间', '操作'];
    return (
      <div className="bootContent historyContent" onClick={(e) => { this.documentClick(e); }}>
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部信息 */}
          <CommonHeader title="历史任务" isMain isUserPort home />
          <div id="content">
            <div className="content-head">
              <div className="ch-top">
                <div className="search-input">
                  <input
                    type="text" placeholder="搜索内容"
                    onChange={(e) => {
                      this.updataState('fileName', e.target.value.trim());
                    }}
                  />
                  <span className="iconfont icon-qianwang" onClick={this.sendRequest} />
                </div>
                <div className="search-condition">
                  {/* 创建人 */}
                  <div
                    className="founder click-item maker"
                    onClick={(e) => {
                      e.stopPropagation();
                      $('.maker').find('.zhankai').toggleClass('rotate');
                      $('.task-state').find('.zhankai').removeClass('rotate');
                      $('.maker').find('.trans-item').slideToggle().toggleClass('active');
                      $('.maker').siblings('.click-item').find('.trans-item').slideUp().removeClass('active');
                    }}
                  >
                    <span className="mr-15">
                      {
                        this.state.name.length > 0 ? this.state.name : '创建人'
                      }
                    </span>
                    <span className="iconfont icon-down-trangle zhankai" />
                    <div className="trans-item trans-item-founder">
                      <div className="founder-list">
                        {
                          nameList.map((item, index) => {
                            return (
                              <span
                                key={index} className="list-item"
                                onClick={() => {
                                  this.updataState({ name: item }, () => {
                                    this.sendRequest();
                                  });
                                }}
                              >{item}</span>
                            );
                          })
                        }
                      </div>
                    </div>

                  </div>
                  {/* 任务状态 */}
                  <div
                    className="task-state click-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      $('.task-state').find('.zhankai').toggleClass('rotate');
                      $('.maker').find('.zhankai').removeClass('rotate');
                      $('.task-state').find('.trans-item').slideToggle().toggleClass('active');
                      $('.task-state').siblings('.click-item').find('.trans-item').slideUp().removeClass('active');
                    }}
                  >
                    <span className="mr-15">{this.state.statusContent}</span>
                    <span className="iconfont icon-down-trangle zhankai" />
                    <div className="trans-item trans-item-state">
                      <div className="task-state-list">
                        {
                          this.state.statusList.map((item) => {
                            return (
                              <span
                                key={item.key} className="list-item"
                                onClick={() => {
                                  this.updataState({
                                    statusContent: item.status,
                                    status: item.retCode,
                                  }, () => {
                                    this.sendRequest();
                                  });
                                }}
                              >{item.status}</span>
                            );
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
                {/* 日历 */}
                <div className="search-calendar">
                  <div className="form-group d_t_dater">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <RangePicker onChange={this.onChangeFn.bind(this)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="content-body">
              <div className="order">
                <div className="order-content">按上传时间排序</div>
                <ul className="order-list">
                  <li className="order-item">按上传时间排序</li>
                  <li className="order-item">按结果项数排序</li>
                </ul>
                <span className="iconfont icon-paixu" />
              </div>
            </div> */}
            {/* 内容区域 */}
            <CommonTable
              filesList={filesList}
              tabHead={tabHead}
              onChangePage={(pageNumber) => { this.onChangePage(pageNumber); }}
            >
              {
                filesList.map((item, index) => {
                  return (
                    <li className="content-item" data-id="'+ item2.id +'" key={index}>
                      <div className="item-title" onClick={this.gotoPopup.bind(this, item.id)}>{item.fileName}</div>
                      <div className="item-author">{item.userName}</div>
                      <div className="item-state">{this.getStatus(item.statusMessage)}</div>
                      <div className="item-time">{item.createTime}</div>
                      <div className="data">
                        <span className="iconfont icon-xiangqing1" onClick={this.gotoPopup.bind(this, item.id)} />
                        <span className="dataFont">数据</span>
                      </div>
                      <div className="portrait">
                        <span className="iconfont icon-huaxiang" onClick={this.gotoUserPortrait.bind(this, item.id)} />
                        <span className="portraitFont">画像</span>
                      </div>
                    </li>
                  );
                })
              }
            </CommonTable>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default connect(({ history }) => ({ history }))(History);
