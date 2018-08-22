import $ from 'jquery';
import '../../utils/md5.js';
import React, { Component } from 'react';
import { Input, message } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import PolyDialog from '../PolyDialog';

class MainWrapper extends Component {
  constructor() {
    super();
    this.state = {
      changePassword: false,
      oldPassword: '', // 旧密码
      newPassword: '', // 新密码
      confirmPassword: '', // 确定密码
    };
  }
  componentDidMount() {
  }
  onOk= () => {
    // 输入框非空判断
    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = this.state;
    if (!oldPassword || !newPassword || !confirmPassword) return false;
    if (newPassword !== confirmPassword) {
      message.info('新密码与确认密码不一致');
      return false;
    }
    if (oldPassword === newPassword) {
      message.info('新旧密码不能一致');
      return false;
    }
    this.props.dispatch({
      type: 'login/resolvePassword',
      payload: {
        oldPwd: $.md5(this.state.oldPassword),
        newPwd: $.md5(this.state.newPassword),
      },
      callback: () => {
        this.props.dispatch(routerRedux.push('/login'));
        this.setState({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          changePassword: false,
        });
      },
    });
  }
  // 退出登录操作
  loginOut= () => {
    this.props.dispatch({
      type: 'login/loginOut',
      payload: {},
      callback: () => {
        this.props.dispatch(routerRedux.push('/login'));
      },
    });
  }
  render() {
    const { title, isMain, isUserPort, goback, home, customer, photograph } = this.props;
    const { userName } = this.props.login;
    return (
      <div>
        {/* 头部信息s */}
        <div className="header">
          <div>
            <span className="logo">M O X I 摩西洞察</span>{title && <span className="fenge">|</span>}{title}
          </div>
        </div>
        {
          isMain && <div
            className="shouye"
            onClick={() => {
              this.props.dispatch(routerRedux.push('/main')); // 跳转到首页
            }}
          >
            <span className="iconfont icon-shouye" />
            <span className="home" >首页</span>
          </div>
        }
        {
          isUserPort && <div
            className="history"
            onClick={() => {
              this.props.dispatch(routerRedux.push('/history'));
            }}
          >
            <i className="iconfont icon-lishijilu" />
            <span className="his">录音列表</span>
          </div>
        }
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
        {
          home && <div className="shezhi">
            <span className="iconfont icon-yonghu2" />
            {/* <span className="userName">{userName}</span>*/}
            <div className="shezhi-content">
              <p className="modify" onClick={() => { this.setState({ changePassword: true }); }}>修改密码</p>
              <p className="exit" onClick={this.loginOut.bind(this)}>退出</p>
            </div>
          </div>
        }
        {/* 客户列表 */}
        {
          customer && <div className="kehu">
            <span className="iconfont icon-iconfontyonghu" />
            <span className="customer">客户列表</span>
          </div>
        }
        {/*  画像 */}
        {
          photograph && <div
            className="huaxiang"
            onClick={() => {
              this.props.dispatch(routerRedux.push('/userPortrait'));
            }}
          >
            <span className="iconfont icon-huaxiang" />
            <span className="photograph">画像</span>
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
            <div className="login-form-dailog">
              <div className="line-item">
                <p>旧密码</p>
                <Input
                  type="password" placeholder="旧密码" value={this.state.oldPassword}
                  onChange={(e) => {
                    this.setState({ oldPassword: e.target.value.trim() });
                  }}
                />
                {
                  this.state.oldPassword === '' && <span>请输入密码</span>
                }
              </div>
              <div className="line-item">
                <p>新密码</p>
                <Input
                  type="password" placeholder="新密码" value={this.state.newPassword}
                  onChange={(e) => {
                    this.setState({ newPassword: e.target.value.trim() });
                  }}
                />
                {
                  this.state.newPassword === '' && <span>请输入密码</span>
                }
              </div>
              <div className="line-item">
                <p>确认密码</p>
                <Input
                  type="password" placeholder="确认密码" value={this.state.confirmPassword}
                  onChange={(e) => {
                    this.setState({ confirmPassword: e.target.value.trim() });
                  }}
                />
                {
                  this.state.confirmPassword === '' && <span>请确认密码</span>
                }
              </div>
            </div>
          </PolyDialog>
        }
      </div>
    );
  }
}
export default connect(({ login }) => ({ login }))(MainWrapper);
