import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'dva';
import {
  DatePicker, Menu, Icon, message, Tooltip, Form, Select, Modal,
  Cascader, Dropdown,
} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { routerRedux } from 'dva/router';
import './history.less';
import '../../assets/iconfont/iconfont.css';
import {
  CommonHeader,
  CommonTable,
} from '../../components';
import { verify } from '../../utils/cookie';
import PolyDialog from "../../components/PolyDialog";

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

class History extends Component {
  constructor() {
    super();
    this.state = {
      flag: true,
      statusContent: '任务状态', // 状态选择
      name: '',
      groupId: '',
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
      composition: '',
      choseTime: '',
      area: '',
      classc: '',
      groupc: '',
    };
    this.sendRequest = this.sendRequest.bind(this);
    this.upDataState = this.upDataState.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getName = this.getName.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.makerClick = this.makerClick.bind(this);
    this.statusClick = this.statusClick.bind(this);
    this.getConstruction = this.getConstruction.bind(this);
    this.editFn = this.editFn.bind(this);
    this.deleteFn = this.deleteFn.bind(this);
  }
  componentWillMount() {
    this.sendRequest();
    this.getName();
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
  /* 获取所属结构列表*/
  getConstruction() {
    verify((err, decoded) => {
      if (err) return;
      this.props.dispatch({
        type: 'userList/getConstruction',
        payload: {
          groupId: decoded.data.groupId,
          roleId: decoded.data.roleId,
        },
        callback: (res) => {
          const arr = [];
          // console.log(res);
          res.map((item, index) => {
            arr[index] = {};
            arr[index].value = res[index].areaId;
            arr[index].label = res[index].areaName;
            if (item.class.length > 0) {
              arr[index].children = [];
              item.class.map((cl, ind) => {
                arr[index].children[ind] = {};
                arr[index].children[ind].value = res[index].class[ind].classId;
                arr[index].children[ind].label = res[index].class[ind].className;
                if (cl.group.length > 0) {
                  arr[index].children[ind].children = [];
                  cl.group.map((gr, id) => {
                    arr[index].children[ind].children[id] = {};
                    arr[index].children[ind].children[id].value = res[index].class[ind].group[id].groupId;
                    arr[index].children[ind].children[id].label = res[index].class[ind].group[id].groupName;
                    return arr;
                  });
                }
                return arr;
              });
            }
            return arr;
          });
          this.setState({
            options: arr,
          });
        },
      });
    });
  }
  // 级联下拉菜单
  onSelectChange = (val, d) => {
    console.log(val);
    const len = val.length;
    const groupId = val[len - 1] + '';
    let area = 0;
    let classc = 0;
    let groupc = 0;
    if (len === 1) {
      area = val[0];
    } else if (len === 2) {
      area = val[0];
      classc = val[1];
    } else if (len === 3) {
      area = val[0];
      classc = val[1];
      groupc = val[2];
    }
    this.setState({
      groupId,
      area,
      classc,
      groupc,
      pageNum: 1,
    }, () => {
      this.sendRequest();
    });
  }
  // 列表中完成状态
  getStatus = (status) => {
    const statusMessage = this.state.statusList.filter(item => item.retCode === status)[0].status;
    return statusMessage;
  }
  // 获取模糊查询name列表
  getName = () => {
    verify((err, decoded) => {
      if (err) return;
      this.props.dispatch({
        type: 'history/getName',
        payload: {
          userName: decoded.data.userName,
        },
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
  // 删除数据
  deleteFn =(taskId) => {
    confirm({
      title: '确定删除该条录音吗?',
      onOk: () => {
        this.props.dispatch({
          type: 'history/deleteFiles',
          payload: { taskId },
          callback: () => {
            this.sendRequest();
            message.success('删除成功', 1);
          },
        });
      },
      onCancel() {
      },
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
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize,
          startTime: this.state.startTime,
          status: this.state.status,
          userName: decoded.data.userName,
          groupId: this.state.groupId,
        },
      });
    });
  }
  // 进入数据界面
  gotoPopup(id, customerId) {
    console.log(customerId)
    this.props.dispatch(routerRedux.push({
      pathname: '/popup',
      query: {
        taskId: id,
        customerId,
      },
    }));
  }
  // 添加客户信息面销时间操作
  addCustomerMsg() {
    this.props.form.validateFields((err, value) => {
      if (err) return;
      this.props.dispatch({
        type: 'history/changeCutsom',
        payload: {
          customId: 54,
          realTime: this.state.choseTime,
          taskId: this.state.taskId,
        },
        callback: () => {
          this.setState({
            showEdit: false,
          });
          this.sendRequest();
        },
      });
    });
  }
  // 编辑操作
  editFn(taskId) {
    this.setState({
      showEdit: true,
      taskId,
    });
  }
  // 重置
  reloadFn() {
    const {
      fileName,
      name,
      groupId,
      status,
      startTime,
      endTime,
    } = this.state;

    const a = [
      fileName,
      name,
      groupId,
      startTime,
      endTime,
      status
      ].some((el)=>{
        return el.length>0
      });
    if (!a) return;

    this.setState({
      fileName: '',
      name: '',
      status: '',
      startTime:'',
      endTime:'',
      groupId:'',
      statusContent: '任务状态',
      flag:false
    }, () => {
      this.setState({flag: true})
      this.sendRequest();
    });
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="bootContent historyContent historyIcon" onClick={(e) => { this.documentClick(e); }}>
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部信息 */}
          <CommonHeader title="录音列表" isMain customer isUserPort home />
          <div id="content">
          {
            this.state.flag &&
            <div className="content-head">
              <div className="ch-top">
                <div className="search-input">
                  <input
                    type="text" placeholder="录音名称"
                    value={this.state.fileName}
                    onChange={(e) => {
                      this.upDataState('fileName', e.target.value.trim());
                    }}
                  />
                  <span
                    className="iconfont icon-qianwang"
                    onClick={() => {
                      if (!this.state.fileName.length) {
                        message.warning('请输入录音名称');
                        return;
                      }
                      this.setState({
                        pageNum: 1,
                      }, () => {
                        this.sendRequest();
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
                                  this.upDataState({ name: item.username }, () => {
                                    this.setState({
                                      pageNum: 1, // 当前页数
                                    }, () => {
                                      this.sendRequest();
                                    });
                                  });
                                }}
                              >{item.username}</span>
                            );
                          })
                        }
                      </div>
                    </div>

                  </div>
                  {/* 结构 */}
                  <div className="composition click-item" id="jiegou">
                    <Cascader
                      allowClear={false}
                      options={this.state.options}
                      onChange={::this.onSelectChange}
                      changeOnSelect={true}
                      popupClassName="selectOptionsPop"
                      expandTrigger="hover"
                      placeholder="所属结构"
                      getPopupContainer={() => document.getElementById('jiegou')}
                    />
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
                        <RangePicker onChange={this.onChangeFn.bind(this)} allowClear={false}/>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 重置*/}
                <div className="reload-button">
                  <Tooltip placement="bottom" title="重置">
                    <Icon type="reload" onClick={::this.reloadFn} />
                  </Tooltip>
                </div>
              </div>
            </div>
            }
            {/* 内容区域 */}
            <CommonTable
              tabHead={tabHead}
              total={total}
              options="操作"
              onChangePage={(pageNumber) => { this.onChangePage(pageNumber); }}
            >
              {
                filesList && filesList.map((item, index) => {
                  return (
                    <li className="content-item" data-id="'+ item2.id +'" key={index}>
                      <Tooltip placement="bottom" title={item.fileName}>
                        <div className="item-title" onClick={this.gotoPopup.bind(this, item.id, item.customerId)}>{item.fileName}</div>
                      </Tooltip>
                      <div className="item-author">{item.userId}</div>
                      <div className="item-composition">{item.area}{item.classc}{item.groupc}</div>
                      <div className="item-state">{this.getStatus(item.statusMessage)}</div>
                      <div className="item-time">{item.createTime}</div>
                      <div className="data">{!item.itemCount ? 0 : item.itemCount}项</div>
                      <div className="item-options">
                        <Tooltip placement="bottom" title="编辑">
                          <span className="iconfont icon-biaozhugongju" onClick={this.editFn.bind(this, item.id)} />
                        </Tooltip>
                        <Tooltip placement="bottom" title="删除">
                          <span className="iconfont icon-shanchu" onClick={() => { this.deleteFn(item.id); }} />
                        </Tooltip>
                      </div>
                    </li>
                  );
                })
              }
            </CommonTable>
          </div>
        </Scrollbars>
        {/*  编辑框*/}
        {
          this.state.showEdit && <PolyDialog
            className="bangding"
            visible={this.state.showEdit}
            style={{
              height: 'auto',
              paddingBottom: 40,
            }}
            onClose={() => {
              this.setState({
                showEdit: false,
              });
            }}
            onOk={::this.addCustomerMsg}
            onCancel={() => {
              this.setState({
                showEdit: false,
              });
            }}
          >
            <Form className="user-form-dailog">
              <FormItem className="line-item" label="面销时间">
                {getFieldDecorator('choseTime', {
                  rules: [{ required: true, message: '请选择面销时间!' }],
                })(
                  <DatePicker
                    onChange={(val, data) => {
                      this.setState({
                        choseTime: data,
                      });
                    }}
                  />,
                )}
              </FormItem>
              <FormItem className="line-item" label="选择客户">
                {getFieldDecorator('choseUser', {
                  rules: [{ required: true, message: '请选择客户!' }],
                })(
                  <Select
                    placeholder="选择客户"
                  >
                    <Option value="1">张三</Option>
                    <Option value="2">李四</Option>
                    <Option value="3">王五</Option>
                  </Select>,
                )}
              </FormItem>
            </Form>
          </PolyDialog>
        }
      </div>
    );
  }
}

export default connect(({ history, userList }) => ({ history, userList }))(Form.create()(History));
