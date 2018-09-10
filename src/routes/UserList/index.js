import $ from 'jquery';
import '../../utils/md5.js';
import React, { Component } from 'react';
import { connect } from 'dva';
import {
  DatePicker, Menu, Form, Input, Select, message, Modal, Tooltip,
} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import PolyDialog from '../../components/PolyDialog';
import './userList.less';
import '../../assets/iconfont/iconfont.css';
import {
  CommonHeader,
  CommonTable,
  CommonFilter,
} from '../../components';
import { verify } from '../../utils/cookie';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: true,
      showUser: false,
      isRevisePwd: false,
      addUser: false,
      searchThing: '', // 搜索用户名
      generation: '所属角色',
      // composition: '所属结构',
      pageNum: 1, // 当前页数
      area: 0, // 区
      classc: 0, // 班
      groupc: 0, // 组
      roleId: '',
      endTime: '',
      startTime: '',
      editUserName: '', // 单条用户username
      generationList: [
        {
          key: '1',
          generation: '超级管理员',
        },
        {
          key: '2',
          generation: '区长',
        },
        {
          key: '3',
          generation: '班长',
        },
        {
          key: '4',
          generation: '组长',
        },
        {
          key: '5',
          generation: '普通销售人员',
        },
      ],
    };

    this.deleteFn = this.deleteFn.bind(this);
    this.editFn = this.editFn.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.changeGeneration = this.changeGeneration.bind(this);
  }
  componentWillMount() {
    this.sendRequest();
    this.getConstruction();
  }
  // 日历操作
  onChangeFn = (date, dateString) => {
    this.setState({
      pageNum: 1,
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
  // 修改，添加信息
  onOk =() => {
    this.props.form.validateFields((err, value) => {
      if (err) return false;
      if (this.state.addUser) { // 新增用户
        this.props.dispatch({
          type: 'userList/addUser',
          payload: {
            nickName: value.nickName,
            passWord: $.md5(value.loginPassword),
            roleId: value.part,
            userName: value.name,
          },
          callback: () => {
            this.setState({
              showUser: false,
            });
            this.sendRequest();
          },
        });
      } else { // 修改用户
        this.props.dispatch({
          type: 'userList/updateUser',
          payload: {
            nickName: value.nickName,
            roleId: value.part,
            userName: this.state.editUserName,
          },
          callback: () => {
            this.setState({
              showUser: false,
            });
            this.sendRequest();
          },
        });
      }
    });
  }

  // 级联下拉菜单
  onSelectChange = (val, d) => {
    console.log(val);
    const len = val.length;
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
      area,
      classc,
      groupc,
      pageNum: 1,
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
                    arr[index].children[ind].children[id].value =
                      res[index].class[ind].group[id].groupId;
                    arr[index].children[ind].children[id].label =
                      res[index].class[ind].group[id].groupName;
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
  deleteFn =(userName) => {
    confirm({
      title: '确定删除该用户吗?',
      onOk: () => {
        this.props.dispatch({
          type: 'userList/deleteUser',
          payload: { userName },
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
  // 编辑/新增数据
  editFn =(item) => {
    this.setState({
      showUser: true,
      addUser: false,
      editUserName: item.userName,
    }, () => {
      this.props.form.setFields({
        part: {
          value: `${item.roleId}`,
          error: [new Error('Fail to load')],
        },
        nickName: {
          value: item.realName,
          error: [new Error('Fail to load')],
        },
      });
    });
  }
  // 重置密码
  revisePwd =() => {
    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (value.confirmNewPassword !== value.newPassword) {
        message.error('两次输入密码不一致!', 1);
        return false;
      }
      this.props.dispatch({
        type: 'userList/revisePwd',
        payload: {
          passwrord: $.md5(value.newPassword),
          userName: this.state.ReviseName,
        },
        callback: () => {
          this.setState({
            isRevisePwd: false,
          }, () => {
            message.success('密码重置成功!', 1);
            this.sendRequest();
          });
        },
      });
    });
  }
  /* 数据请求*/
  sendRequest =() => {
    this.props.dispatch({
      type: 'userList/getUserList',
      payload: {
        roleId: this.state.roleId,
        userName: this.state.searchThing,
        area: this.state.area,
        classc: this.state.classc,
        groupc: this.state.groupc,
        endTime: this.state.endTime,
        startTime: this.state.startTime,
        page: this.state.pageNum,
      },
    });
  }
  /* 角色转换*/
  changeGeneration =(code) => {
    const generation = this.state.generationList.filter(item => item.key === code)[0].generation;
    return generation;
  }
  // 重置
  reloadFn() {
    const {
      searchThing,
      startTime,
      endTime,
      roleId,
      area,
      classc,
      groupc,
    } = this.state;

    const a = [
      searchThing,
      startTime,
      endTime,
      roleId].some((el) => {
        return el.length > 0;
      });
    if (!a && [
      area,
      classc,
      groupc].every((e) => {
        return e === 0;
      })) return;
    this.setState({
      flag: false,
      searchThing: '',
      roleId: '',
      area: 0,
      classc: 0,
      groupc: 0,
      startTime: '',
      endTime: '',
      generation: '所属角色',
    }, () => {
      this.setState({ flag: true });
      this.sendRequest();
    });
  }
  render() {
    const {
      userList,
      // constructionList,
    } = this.props.userList;
    const tabHead = ['用户名称', '所属角色', '用户昵称', '最后登录IP', '最后登录时间', '创建时间'];
    const generation = (
      <Menu
        className="composition-down-load"
        onClick={(item) => {
          this.setState({
            roleId: item.key,
            pageNum: 1,
            generation: this.changeGeneration(item.key),
          }, () => {
            this.sendRequest();
          });
        }}
      >
        {
          this.state.generationList.map((item) => {
            return <Menu.Item key={item.key}>{item.generation}</Menu.Item>;
          })
        }
      </Menu>
    )
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="bootContent historyContent userContent" id="bootContent">
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部信息 */}
          <CommonHeader title="用户管理" isMain customer isUserPort home />
          <div id="content">
            {
              this.state.flag && <CommonFilter
                searchTitle="用户名称"
                state={this.state}
                addUser
                generation={generation}
                upDataState={::this.upDataState}
                sendRequest={::this.sendRequest}
                onSelectChange={::this.onSelectChange}
                onChangeFn={::this.onChangeFn}
                reloadFn={::this.reloadFn}
              />
            }
            {/* 内容区域 */}
            <CommonTable
              tabHead={tabHead}
              total={this.props.userList.userCounts}
              options="操作"
              onChangePage={(pageNumber) => { this.onChangePage(pageNumber); }}
            >
              {
                userList.length > 0 && userList.map((item, index) => {
                  return (
                    <li className="content-item" data-id="'+ item2.id +'" key={index}>
                      <div className="item-title">{item.userName}</div>
                      <div className="item-author">{item.roleName}</div>
                      <div className="item-composition">{item.realName}</div>
                      <div className="item-state">{item.loginIp}</div>
                      <div className="item-time">{item.loginTime}</div>
                      <div className="data">{item.addTime}</div>
                      <div className="item-options">
                        <Tooltip placement="bottom" title="编辑">
                          <span className="iconfont icon-biaozhugongju" onClick={() => { this.editFn(item); }} />
                        </Tooltip>
                        <Tooltip placement="bottom" title="修改密码">
                          <span
                            className="iconfont icon-xiugaimima"
                            onClick={() => {
                              this.setState({
                                isRevisePwd: true,
                                ReviseName: item.userName,
                              });
                            }}
                          />
                        </Tooltip>
                        <Tooltip placement="bottom" title="删除">
                          <span className="iconfont icon-shanchu" onClick={() => { this.deleteFn(item.userName); }} />
                        </Tooltip>
                      </div>
                    </li>
                  );
                })
              }
            </CommonTable>
          </div>
        </Scrollbars>
        {/* 编辑/添加用户弹框 */}
        {
          this.state.showUser && <PolyDialog
            visible={this.state.showUser}
            style={this.state.addUser ? { width: 600, height: 500 } : { height: 250 }}
            onClose={() => {
              this.setState({
                showUser: false,
              });
            }}
            onOk={this.onOk.bind(this)}
            onCancel={() => {
              this.setState({
                showUser: false,
              });
            }}
          >
            <Form className="user-form-dailog">

              <FormItem className="line-item" label="所属角色">
                {getFieldDecorator('part', {
                  rules: [{ required: true, message: '请选择所属角色!' }],
                })(
                  <Select
                    placeholder="请选择角色"
                  >
                    {
                      this.state.generationList.map((item) => {
                        return <Option value={item.key} key={item.key}>{item.generation}</Option>;
                      })
                    }
                  </Select>,
                )}
              </FormItem>
              {
                this.state.addUser &&
                <FormItem hasFeedback className="line-item" label="用户名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入用户名称' }],
                  })(
                    <Input placeholder="用户名称" type="text" />,
                  )}
                </FormItem>
              }
              <FormItem hasFeedback className="line-item" label="用户昵称">
                {getFieldDecorator('nickName', {
                  rules: [{ required: true, message: '请输入用户昵称!' }],
                })(
                  <Input type="text" placeholder="用户昵称" />,
                )}
              </FormItem>
              {
                this.state.addUser && <FormItem hasFeedback className="line-item" label="登录密码">
                  {getFieldDecorator('loginPassword', {
                    rules: [{ required: true, message: '请输入登录密码!' }],
                  })(
                    <Input type="password" placeholder="登录密码" />,
                  )}
                </FormItem>
              }
              {
                this.state.addUser && <FormItem hasFeedback className="line-item" label="确认密码">
                  {getFieldDecorator('confirmPassword', {
                    rules: [{ required: true, message: '请确认密码!' }],
                  })(
                    <Input type="password" placeholder="确认密码" />,
                  )}
                </FormItem>
              }
            </Form>
          </PolyDialog>
        }
        {/* 重置密码 */}
        {
          this.state.isRevisePwd && <PolyDialog
            visible={this.state.isRevisePwd}
            style={{ height: 250 }}
            onClose={() => {
              this.setState({
                isRevisePwd: false,
              });
            }}
            onOk={::this.revisePwd}
            onCancel={() => {
              this.setState({
                isRevisePwd: false,
              });
            }}
          >
            <Form className="user-form-dailog">
              <FormItem hasFeedback className="line-item" label="新密码">
                {getFieldDecorator('newPassword', {
                  rules: [{ required: true, message: '请输入新密码!' }],
                })(
                  <Input type="password" placeholder="请输入新密码" />,
                )}
              </FormItem><FormItem hasFeedback className="line-item" label="确认密码">
                {getFieldDecorator('confirmNewPassword', {
                  rules: [{ required: true, message: '请确认密码!' }],
                })(
                  <Input type="password" placeholder="请再次确认密码" />,
                )}
              </FormItem>
            </Form>
          </PolyDialog>
        }
      </div>
    );
  }

}

export default connect(({ userList }) => ({ userList }))(Form.create()(UserList));
