import React, { Component } from 'react';
import { Input } from 'antd';
import { routerRedux } from "dva/router";
import { connect } from "dva";
import PolyDialog from "../PolyDialog";

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
  // 退出登录操作
  loginOut() {
    this.props.dispatch({
      type: 'login/loginOut',
      payload: {},
      callback: () => {
        this.props.dispatch(routerRedux.push('/login'));
      },
    });
  }
  render() {
    const { title, isMain, isUserPort, goback, home } = this.props;
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
            <span className="iconfont icon-shouye"></span>
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
            <span className="his">历史记录</span>
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
            <div className="shezhi-content">
              <p className="modify" onClick={() => { this.setState({ changePassword: true }); }}>修改密码</p>
              <p className="exit" onClick={this.loginOut.bind(this)}>退出</p>
            </div>
          </div>
        }
        {
          this.state.changePassword && <PolyDialog
            title="修改密码"
            visible={this.state.changePassword}
            onClose={() => {
              this.setState({ changePassword: false });
            }}
            onOk={() => {
              this.props.dispatch({
                type: 'login/resolvePassword',
                payload: {
                  oldPwd: this.state.oldPassword,
                  newPwd: this.state.newPassword,
                },
                callback: (res) => {
                  if (res.result) {
                    this.props.dispatch(routerRedux.push('/login'));
                  }
                  this.setState({ changePassword: false });
                },
              });
            }}
            onCancel={() => {
              this.setState({ changePassword: false });
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
