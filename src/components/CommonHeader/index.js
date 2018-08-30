import $ from 'jquery';
import '../../utils/md5.js';
import { connect } from 'dva';
import React, { Component } from 'react';
import { Input, message, Form } from 'antd';
import { routerRedux } from 'dva/router';
import PolyDialog from '../PolyDialog';
import {
  verify,
} from '../../utils/cookie';

const FormItem = Form.Item;

class MainWrapper extends Component {
  constructor() {
    super();
    this.state = {
      changePassword: false,
      oldPassword: '', // 旧密码
      newPassword: '', // 新密码
      confirmPassword: '', // 确定密码
      userName: '',
    };
  }
  componentWillMount() {
    verify((err, decoded) => {
      if (err) return;
      this.setState({
        userName: decoded.data.userName,
      });
    });
  }
  /* 修改密码*/
  onOk= () => {
    // 输入框非空判断
    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = this.state;
    this.props.form.validateFields((err) => {
      if (!err) {
        if (oldPassword === newPassword) {
          message.error('新旧密码不能一致');
          return false;
        }
        if (newPassword !== confirmPassword) {
          message.error('新密码与确认密码不一致');
          return false;
        }
        this.props.dispatch({
          type: 'login/resolvePassword',
          payload: {
            userName: 'root',
            oldPassWord: oldPassword,
            newPassWord: newPassword,
          },
          callback: () => {
            // 退出登录
            this.loginOut();
          },
        });
      }
    });
  }
  // 退出登录操作
  loginOut= () => {
    this.props.dispatch({
      type: 'login/loginOut',
      payload: {
        userName: 'root',
      },
      callback: () => {
        this.props.dispatch({
          type: 'login/loginOutSuccess',
          callback: () => {
            this.props.dispatch(routerRedux.push('/login'));
          },
        });
      },
    });
  }
  render() {
    const {
      title,
      isMain,
      isUserPort,
      goback,
      home,
      customer,
      photograph,
      record,
      taskId,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {/* 头部信息 */}
        <div className="header">
          <div>
            <span className="logo">M O X I 摩西洞察</span>{title && <span className="fenge">|</span>}{title}
          </div>
        </div>
        {/* 返回首页*/}
        {
          isMain && <div
            className="shouye"
            onClick={() => {
              if (location.pathname === '/main') return;
              this.props.dispatch(routerRedux.push('/main')); // 跳转到首页
            }}
          >
            <span className="iconfont icon-shouye" />
            <span className="home" >首页</span>
          </div>
        }
        {/* 录音列表*/}
        {
          isUserPort && <div
            className="history"
            onClick={() => {
              if (location.pathname === '/history') return;
              this.props.dispatch(routerRedux.push('/history'));
            }}
          >
            <i className="iconfont icon-lishijilu" />
            <span className="his">录音列表</span>
          </div>
        }
        {/* goback */}
        {
          goback && <div
            id="back"
            onClick={() => {
              this.props.dispatch(routerRedux.push('/history'));
            }}
          >
            <span className="iconfont icon-qianwang" />
            <span className="back">返回</span>
          </div>
        }
        {/* user操作*/}
        {
          home && <div className="shezhi">
            <span className="iconfont icon-yonghu2" />
            <span className="userName">{this.state.userName}</span>
            <div className="shezhi-content">
              {
                this.state.userName === 'root' && <p>用户管理</p>
              }
              {
                this.state.userName === 'root' && <p onClick={() => {
                  this.props.dispatch(routerRedux.push({
                    pathname: '/structure',
                  }));
                }}>结构管理</p>
              }
              <p className="modify" onClick={() => { this.setState({ changePassword: true }); }}>修改密码</p>
              <p className="exit" onClick={this.loginOut.bind(this)}>退出</p>
            </div>
          </div>
        }
        {/* 客户列表 */}
        {
          customer && <div
            className="kehu"
            onClick={() => {
              if (location.pathname === '/clientList') return;
              this.props.dispatch(routerRedux.push('/clientList'));
            }}
          >
            <span className="iconfont icon-5176" />
            <span className="customer">客户列表</span>
          </div>
        }
        {/*  画像 */}
        {
          photograph && <div
            className="huaxiang"
            onClick={() => {
              if (location.pathname === '/userPortrait') return;
              this.props.dispatch(routerRedux.push({
                pathname: '/userPortrait',
                query: {
                  taskId,
                },
              }));
            }}
          >
            <span className="iconfont icon-huaxiang" />
            <span className="photograph">画像</span>
          </div>
        }
        {/* 数据/录音播放页 */}
        {
          record && <div
            className="shuju"
            onClick={() => {
              if (location.pathname === '/popup') return;
              this.props.dispatch(routerRedux.push({
                pathname: '/popup',
                query: {
                  taskId,
                },
              }));
            }}
          > <span className="iconfont icon-xiangqing1" />
            <span className="record">数据</span>
          </div>
        }
        {/* 修改密码弹框 */}
        {
          this.state.changePassword && <PolyDialog
            title="修改密码"
            visible={this.state.changePassword}
            onClose={() => {
              this.setState({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                changePassword: false,
              });
            }}
            onOk={this.onOk.bind(this)}
            onCancel={() => {
              this.setState({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                changePassword: false,
              });
            }}
          >
            <Form className="login-form-dailog">
              <FormItem hasFeedback className="line-item" label="旧密码">
                {getFieldDecorator('oldPassword', {
                  rules: [{ required: true, message: '请输入旧密码!' }],
                })(
                  <Input
                    placeholder="旧密码"
                    type="password"
                    onChange={(e) => {
                      this.setState({ oldPassword: e.target.value.trim() });
                    }}
                  />,
                )}
              </FormItem>
              <FormItem hasFeedback className="line-item" label="新密码">
                {getFieldDecorator('newPassword', {
                  rules: [{ required: true, message: '请输入新密码!' }],
                })(
                  <Input
                    type="password" placeholder="新密码"
                    onChange={(e) => {
                      this.setState({ newPassword: e.target.value.trim() });
                    }}
                  />,
                )}
              </FormItem>
              <FormItem hasFeedback className="line-item" label="确认密码">
                {getFieldDecorator('confirmPassword', {
                  rules: [{ required: true, message: '请确认密码!' }],
                })(
                  <Input
                    type="password" placeholder="确认密码"
                    onChange={(e) => {
                      this.setState({ confirmPassword: e.target.value.trim() });
                    }}
                  />,
                )}
              </FormItem>
            </Form>
          </PolyDialog>
        }
      </div>
    );
  }
}
export default connect(({ login }) => ({ login }))(Form.create()(MainWrapper));
