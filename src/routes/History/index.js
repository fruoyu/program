import React, { Component } from 'react';
import { connect } from 'dva';
import {
  DatePicker, Menu, Icon, message, Tooltip, Form, Select, Modal, Spin,
} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import './history.less';
import '../../assets/iconfont/iconfont.css';
import {
  CommonHeader,
  CommonTable,
  CommonFilter,
} from '../../components';
import { verify } from '../../utils/cookie';
import PolyDialog from "../../components/PolyDialog";

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

class History extends Component {
  constructor() {
    super();
    this.state = {
      flag: true,
      taskData: {},
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
          retCode: 'analyse-error',
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
      searchThing: '', // 录音文件名称
      pageNum: 1, // 当前页数
      pageSize: 10, // 请求数
      startTime: '', // 开始时间
      status: '',
      composition: '',
      choseTime: '',
      area: '',
      classc: '',
      groupc: '',

      data: [],
      value: [],
      fetching: false,
    };
    this.sendRequest = this.sendRequest.bind(this);
    this.upDataState = this.upDataState.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getName = this.getName.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    // this.getConstruction = this.getConstruction.bind(this);
    this.editFn = this.editFn.bind(this);
    this.deleteFn = this.deleteFn.bind(this);
    this.reloadFn = this.reloadFn.bind(this);
  }
  componentWillMount() {
    this.sendRequest();
    this.getName();
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
  // 级联下拉菜单
  onSelectChange = (val, d) => {
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
          fileName: this.state.searchThing,
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
  gotoPopup(id, customerId, pageNum, status, realTime) {
    if(status==='analysing'|| status ==='analyse-error'){
      Modal.info({
        title: '不能查看洞察详情',
        content: '录音未完成或正在分析中，请稍后。。。'
      });
    } else if(!customerId || !realTime){
      Modal.info({
        title: '完善客户信息',
        content: '请先绑定客户或添加面销时间'
      });
    } else {
      this.props.dispatch(routerRedux.push({
        pathname: '/popup',
        query: {
          taskId: id,
          customerId,
          pageNum
        },
      }));
    }
    
   
  }
  // 添加客户信息面销时间操作
  addCustomerMsg() {
    this.props.form.validateFields((err, value) => {
      if (err) return;
      const { choseUser:{key:customerId} } = value;
      this.props.dispatch({
        type: 'history/changeCutsom',
        payload: {
          customId: customerId,
          realTime: this.state.choseTime,
          taskId: this.state.taskId,
        },
        callback: () => {
          message.success('录音绑定成功', 1);
          this.setState({
            showEdit: false,
          });
          this.sendRequest();
        },
      });
    });
  }
  // 编辑操作
  editFn(item) {
    const {id: taskId, RealTime, customerId, customerName, CustomerPhone } = item;  
    const defDate = RealTime ? {initialValue: moment(RealTime, 'YYYY-MM-DD')} : {};
    const initCustomerId = customerId ? { initialValue: {key: ''+customerId, label: `${customerName}-${CustomerPhone}`} } : {};
    const initCustomerName = customerName ? customerName : null;
    const dateInit = {
      ...defDate,
      rules: [{ required: true, message: '请选择面销时间!' }],
    }
    this.setState({
      showEdit: true,
      taskId,
      choseTime: RealTime,
      taskData: {
        dateInit,
        customerId,
        initCustomerId,
        initCustomerName
      }
    });
  }
  // 重置
  reloadFn() {
    const {
      searchThing,
      name,
      groupId,
      status,
      startTime,
      endTime,
    } = this.state;

    const a = [
      searchThing,
      name,
      groupId,
      startTime,
      endTime,
      status,
    ].some((el) => {
      return el.length > 0;
    });
    if (!a) return;

    this.setState({
      searchThing: '',
      name: '',
      status: '',
      startTime: '',
      endTime: '',
      groupId: '',
      statusContent: '任务状态',
      flag: false,
    }, () => {
      this.setState({ flag: true });
      this.sendRequest();
    });
  }
  // 改变状态
  changeStatus = (code) => {
    const statusContent = this.state.generationList.filter(item => item.key === code)[0].generation;
    return statusContent;
  }

  fetchUser = (value) => {
    this.setState({ data: [], fetching: true });
    verify((err, decoded) => {
      this.props.dispatch({
        type: 'clientList/getClientList',
        payload: {
          userName: decoded.data.userName,
          page: -1,
          customerType: value,
        },
        cb: (res) => {
          const { result: data } = res.data;
          this.setState({ data, fetching: false });
        },
      });
    });
  }

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }
  render() {
    const {
      filesList = [],
      nameList = [],
      total = 0,
    } = this.props.history;
    const tabHead = ['录音名称', '销售人员', '结构', '任务状态', '上传时间', '洞察项'];
    const { getFieldDecorator } = this.props.form;
    const { fetching, data, value} = this.state;
    const options = (
      <Menu
        className="composition-down-load"
        onClick={(item) => {
          this.upDataState({ name: item.key, pageNum: 1 }, () => {
            this.sendRequest();
          });
        }}
      >
        {
          nameList.map((item) => {
            return <Menu.Item key={item.username}>{item.username}</Menu.Item>;
          })
        }
      </Menu>
    )
    const status = (
      <Menu
        className="composition-down-load"
        onClick={(item) => {
          this.upDataState({
            statusContent: item.key === 'item_0' ? '全部' : this.getStatus(item.key),
            status: item.key === 'item_0' ? '' : item.key,
            pageNum: 1, // 当前页数
          }, () => {
            this.sendRequest();
          });
        }}
      >
        {
          this.state.statusList.map((item) => {
            return <Menu.Item key={item.retCode}>{item.status}</Menu.Item>;
          })
        }
      </Menu>
    )

    return (
      <div className="bootContent historyContent historyIcon">
        <Scrollbars style={{ flex:1 }} autoHide={false}>
          {/* 头部信息 */}
          <CommonHeader title="录音列表" isMain customer isUserPort home />
          <div id="content">
            {
            this.state.flag && <CommonFilter
              status={status}
              searchTitle="录音名称"
              state={this.state}
              options={options}
              upDataState={this.upDataState}
              sendRequest={this.sendRequest}
              onSelectChange={this.onSelectChange}
              onChangeFn={this.onChangeFn}
              reloadFn={this.reloadFn}
            />
            }
            {/* 内容区域 */}
            <CommonTable
              tabHead={tabHead}
              total={total}
              options="操作"
              onChangePage={(pageNumber) => { this.onChangePage(pageNumber); }}
              current={this.state.pageNum}
            >
              {
                filesList && filesList.map((item, index) => {
                  return (
                    <li className="content-item" data-id="'+ item2.id +'" key={index}>
                      <Tooltip placement="bottom" title={item.fileName}>
                        <div className="item-title pointer" onClick={this.gotoPopup.bind(this, item.id, item.customerId, this.state.pageNum, item.statusMessage, item.RealTime)}>{item.fileName}</div>
                      </Tooltip>
                      <div className="item-author">{item.userId}</div>
                      <div className="item-composition">{item.area}{item.classc}{item.groupc}</div>
                      <div className="item-state">{this.getStatus(item.statusMessage)}</div>
                      <div className="item-time">{item.createTime}</div>
                      <div className="data">{!item.itemCount ? 0 : item.itemCount}项</div>
                      <div className="item-options">
                        <Tooltip placement="bottom" title="编辑">
                          <span className="iconfont icon-biaozhugongju" onClick={this.editFn.bind(this, item)} />
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
            <Form className="user-form-dailog" >
              <FormItem className="line-item" label="面销时间">
                {getFieldDecorator('choseTime', this.state.taskData.dateInit)(
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
                  ...this.state.taskData.initCustomerId,
                  rules: [{ required: true, message: '请选择客户!' }],
                })(
                  <Select
                    showSearch
                    labelInValue
                    placeholder="选择客户"
                    optionFilterProp="children"
                    filterOption={false}
                    onSearch={::this.fetchUser}
                    onChange={::this.handleChange}
                    style={{ width: '100%' }}
                  >
                    {data.map(d => <Option key={d.customerId} value={''+d.customerId} >{d.customerName+'-'+d.customerPhone}</Option>)}
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
