import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker, Menu, Dropdown, Icon, message } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { routerRedux } from 'dva/router';
import './history.less';
import '../../assets/iconfont/iconfont.css';
import {
  CommonHeader,
  CommonTable,
} from '../../components';
import { ifToken, verify } from '../../utils/cookie';

const SubMenu = Menu.SubMenu;
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
      composition: '所属结构',
    };
    this.sendRequest = this.sendRequest.bind(this);
    this.upDataState = this.upDataState.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getName = this.getName.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.makerClick = this.makerClick.bind(this);
    this.statusClick = this.statusClick.bind(this);
    this.getConstruction = this.getConstruction.bind(this);
  }
  componentDidMount() {
    this.sendRequest();
    // this.getName();
    this.getConstruction();
  }
  // 日历操作
  onChangeFn = (date, dateString) => {
    this.setState({
      pageNum: 1, // 当前页数
      startTime: dateString[0], // 开始时间
      endTime: dateString[1], // 结束时间
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
  /* 获取所属结构列表*/
  getConstruction() {
    verify((err, decoded) => {
      ifToken(() => {
        this.props.dispatch({
          type: 'userList/getConstruction',
          payload: {
            groupId: decoded.data.groupId,
            roleId: decoded.data.roleId,
          },
        });
      });
    });
  }
  // document 点击操作
  documentClick = (e) => {
    if ($('.trans-item-founder').attr('class').indexOf('active') > -1 && $(e.target).closest('.trans-item-founder').length === 0) {
      $('.trans-item-founder').siblings('.zhankai').removeClass('rotate');
      $('.trans-item-founder').removeClass('active');
      $('.trans-item-founder').hide();
    } else if ($('.trans-item-state').attr('class').indexOf('active') > -1 && $(e.target).closest('.trans-item-state').length === 0) {
      $('.trans-item-state').siblings('.zhankai').removeClass('rotate');
      $('.trans-item-state').removeClass('active');
      $('.trans-item-state').hide();
    }
  }
  // 点击创建人下拉
  makerClick = (e) => {
    e.stopPropagation();
    $('.maker').find('.zhankai').toggleClass('rotate');
    $('.task-state').find('.zhankai').removeClass('rotate');
    $('.maker').find('.trans-item').toggle().toggleClass('active');
    $('.maker').siblings('.click-item').find('.trans-item').hide().removeClass('active');
  }
  // 任务状态点击下拉
  statusClick = (e) => {
    e.stopPropagation();
    $('.task-state').find('.zhankai').toggleClass('rotate');
    $('.maker').find('.zhankai').removeClass('rotate');
    $('.task-state').find('.trans-item').toggle().toggleClass('active');
    $('.task-state').siblings('.click-item').find('.trans-item').hide().removeClass('active');
  }
  // 更新state数据
  upDataState(key, data, callback) {
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
    verify((err, decoded) => {
      if (err) return;
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
          userName: decoded.data.userName,
          groupId: decoded.data.groupId,
        },
      });
    });
  }
  // 进入数据界面
  gotoPopup(id) {
    this.props.dispatch(routerRedux.push({
      pathname: '/popup',
      query: {
        taskId: id,
      },
    }));
  }
  render() {
    const {
      filesList = [],
      nameList = [],
      total = 0,
    } = this.props.history;
    const {
      constructionList,
    } = this.props.userList;
    const tabHead = ['录音名称', '销售人员', '结构', '任务状态', '上传时间', '洞察项'];
    const menu = (
      <Menu
        className="composition-down-load"
        onClick={(item) => {
          const key = item.keyPath;
          const len = key.length;
          let str = '';
          let area = '';
          let classc = '';
          let groupc = '';
          if (len === 1) {
            str = `${constructionList[key[0]].areaName}`;
            area = constructionList[key[0]].areaId;
          } else if (len === 2) {
            str = `${constructionList[key[1]].areaName}/${constructionList[key[1]].class[key[0]].className}`;
            area = constructionList[key[1]].areaId;
            classc = constructionList[key[1]].class[key[0]].classId;
          } else if (len === 3) {
            str = `${constructionList[key[2]].areaName}/${constructionList[key[2]].class[key[1]].className}/${constructionList[key[2]].class[key[1]].group[key[0]].groupName}`;
            area = constructionList[key[2]].areaId;
            classc = constructionList[key[2]].class[key[1]].classId;
            groupc = constructionList[key[2]].class[key[1]].group[key[0]].groupId;
          }
          this.setState({
            composition: str,
            area,
            classc,
            groupc,
            pageNum: 1,
          }, () => {
            ifToken(() => {
              this.sendRequest();
            });
          });
        }}
      >
        {
          constructionList && constructionList.map((item, areaInd) => {
            return (
              !item.class.length ? <Menu.Item key={areaInd}>{item.areaName}</Menu.Item> :
                <SubMenu title={item.areaName} key={areaInd}>
                  {
                    item.class.map((content, classInd) => {
                      return (
                        !content.group.length ? <Menu.Item key={classInd}>
                          {content.className}</Menu.Item> : (
                          <SubMenu title={content.className} key={classInd}>
                            {
                              content.group.map((title, groupInd) => {
                                return (
                                  <Menu.Item key={groupInd}>{title.groupName}</Menu.Item>
                                );
                              })
                            }
                          </SubMenu>
                        )
                      );
                    })
                  }
                </SubMenu>
            );
          })
        }
      </Menu>
    );
    return (
      <div className="bootContent historyContent historyIcon" onClick={(e) => { this.documentClick(e); }}>
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部信息 */}
          <CommonHeader title="录音列表" isMain customer isUserPort />
          <div id="content">
            <div className="content-head">
              <div className="ch-top">
                <div className="search-input">
                  <input
                    type="text" placeholder="搜索内容"
                    onChange={(e) => {
                      this.upDataState('fileName', e.target.value.trim());
                    }}
                  />
                  <span
                    className="iconfont icon-qianwang"
                    onClick={() => {
                      if (!this.state.fileName.length) {
                        message.warning('请输入搜索内容');
                        return;
                      }
                      this.setState({
                        pageNum: 1,
                      }, () => {
                        ifToken(() => {
                          this.sendRequest();
                        });
                      });
                    }}
                  />
                </div>
                <div className="search-condition">
                  {/* 创建人 */}
                  <div className="founder click-item maker" onClick={(e) => { this.makerClick(e); }}>
                    <span className="mr-15">
                      {
                        this.state.name.length > 0 ? this.state.name : '创建人'
                      }
                    </span>
                    <span className="iconfont icon-down-trangle zhankai" />
                    <div className="trans-item trans-item-founder">
                      <div className="founder-list">
                        {
                          nameList && nameList.map((item, index) => {
                            return (
                              <span
                                key={index} className="list-item"
                                onClick={() => {
                                  this.upDataState({ name: item }, () => {
                                    this.setState({
                                      pageNum: 1, // 当前页数
                                    }, () => {
                                      ifToken(() => {
                                        this.sendRequest();
                                      });
                                    });
                                  });
                                }}
                              >{item}</span>
                            );
                          })
                        }
                      </div>
                    </div>

                  </div>
                  {/* 结构 */}
                  <div className="composition click-item">
                    <Dropdown overlay={menu} trigger={['click']}>
                      <span className="ant-dropdown-link">
                        {this.state.composition}<Icon type="down" />
                      </span>
                    </Dropdown>
                  </div>
                  {/* 任务状态 */}
                  <div className="task-state click-item" onClick={(e) => { this.statusClick(e); }} >
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
                                  this.upDataState({
                                    statusContent: item.status,
                                    status: item.retCode,
                                    pageNum: 1, // 当前页数
                                  }, () => {
                                    ifToken(() => {
                                      this.sendRequest();
                                    });
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
            {/* 内容区域 */}
            <CommonTable
              tabHead={tabHead}
              total={total}
              onChangePage={(pageNumber) => { this.onChangePage(pageNumber); }}
            >
              {
                filesList && filesList.map((item, index) => {
                  return (
                    <li className="content-item" data-id="'+ item2.id +'" key={index}>
                      <div className="item-title" onClick={this.gotoPopup.bind(this, item.id)}>{item.fileName}</div>
                      <div className="item-author">{item.userId}</div>
                      <div className="item-composition">A区A班A组</div>
                      <div className="item-state">{this.getStatus(item.statusMessage)}</div>
                      <div className="item-time">{item.createTime}</div>
                      <div className="data">11项</div>
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

export default connect(({ history, userList }) => ({ history, userList }))(History);
