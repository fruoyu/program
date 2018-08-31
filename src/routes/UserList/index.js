import $ from 'jquery';
import '../../utils/md5.js';
import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker, Menu, Dropdown, Icon, Form, Input, Select, message, Modal } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { routerRedux } from 'dva/router';
import PolyDialog from '../../components/PolyDialog';
import './userList.less';
import '../../assets/iconfont/iconfont.css';
import {
  CommonHeader,
  CommonTable,
} from '../../components';
import { verify } from '../../utils/cookie';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const confirm = Modal.confirm;

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showUser: false,
      isRevisePwd: false,
      addUser: false,
      userName: '',
      generation: '所属角色',
      composition: '所属结构',
      pageNum: 1,
      area: 0,
      classc: 0,
      groupc: 0,
      roleId: '',
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
    this.cleanState = this.cleanState.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.changeGeneration = this.changeGeneration.bind(this);
  }
  componentDidMount() {
    this.sendRequest();
  }
  // 日历操作
  onChangeFn = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
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
  // 清空state
  cleanState() {
    this.setState({});
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
      title: '确定删除该录音吗?',
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
  /* 下拉*/
  handleSelectChange = (value) => {
    console.log(value);
  }
  /* 数据请求*/
  sendRequest =() => {
    this.props.dispatch({
      type: 'userList/getUserList',
      payload: {
        roleId: this.state.roleId,
        userName: this.state.userName,
        area: this.state.area,
        classc: this.state.classc,
        groupc: this.state.groupc,
        page: this.state.pageNum,
      },
    });
  }
  /* 角色转换*/
  changeGeneration =(code) => {
    const generation = this.state.generationList.filter(item => item.key === code)[0].generation;
    return generation;
  }
  render() {
    const {
      userList,
    } = this.props.userList;
    const tabHead = ['用户名称', '所属角色', '用户昵称', '最后登录IP', '最后登录时间', '创建时间'];
    const menu = (
      <Menu
        className="composition-down-load"
        onClick={(item) => {
          console.log(item);
        }}
      >
        <Menu.Item key="1">A区</Menu.Item>
        <Menu.Item key="2">B区</Menu.Item>
        <SubMenu title="C区" key="3">
          <Menu.Item key="1">A班</Menu.Item>
          <SubMenu title="B班" key="2">
            <Menu.Item key="1">A组</Menu.Item>
            <Menu.Item key="2">B组</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu title="D区" key="4">
          <Menu.Item key="1">A班</Menu.Item>
          <Menu.Item key="2">B班</Menu.Item>
          <Menu.Item key="3">C班</Menu.Item>
        </SubMenu>
      </Menu>
    );
    const generation = (
      <Menu
        className="composition-down-load"
        onClick={(item) => {
          this.setState({
            roleId: item.key,
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
      <div className="bootContent historyContent userContent" >
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部信息 */}
          <CommonHeader title="用户管理" isMain />
          <div id="content">
            <div className="content-head">
              <div className="ch-top">
                <div className="search-input">
                  <input
                    type="text" placeholder="用户姓名"
                    onChange={(e) => {
                      this.upDataState('userName', e.target.value.trim());
                    }}
                  />
                  <span className="iconfont icon-qianwang" onClick={this.sendRequest} />
                </div>
                <div className="search-condition">
                  {/* 所属角色 */}
                  <div className="generation">
                    <Dropdown overlay={generation} trigger={['click']}>
                      <span className="ant-dropdown-link">
                        {this.state.generation}<Icon type="down" />
                      </span>
                    </Dropdown>
                  </div>
                  {/* 所属结构 */}
                  <div className="composition">
                    <Dropdown overlay={menu} trigger={['click']}>
                      <span className="ant-dropdown-link">
                        {this.state.composition}<Icon type="down" />
                      </span>
                    </Dropdown>
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

              <div
                className="buttonCont"
                onClick={() => {
                  this.setState({
                    showUser: true,
                    addUser: true,
                  });
                }}
              >新建用户</div>
            </div>
            {/* 内容区域 */}
            <CommonTable
              tabHead={tabHead}
              total={20}
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
                        <span className="iconfont icon-biaozhugongju" onClick={() => { this.editFn(item); }} />
                        <span
                          className="iconfont icon-xiugaimima"
                          onClick={() => {
                            this.setState({
                              isRevisePwd: true,
                              ReviseName: item.userName,
                            });
                          }}
                        />
                        <span className="iconfont icon-shanchu" onClick={() => { this.deleteFn(item.userName); }} />
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
                    onChange={this.handleSelectChange}
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
