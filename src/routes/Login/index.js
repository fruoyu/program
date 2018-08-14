import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Button, Form, Input } from 'antd';
import { routerRedux } from 'dva/router';

import './login.less';

const FormItem = Form.Item;
// this.props.dispatch(routerRedux.push('/StandardOrder')); // 路由跳转


class Login extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      userName: '123',
      passWord: '',
    };
  }
  componentDidMount() {
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        // this.props.dispatch(routerRedux.push({
        //   pathname: 'index/home',
        //   query: {
        //     page: 2,
        //   },
        // }));
        this.props.dispatch({
          type: 'login/saveLoginMsg',
          payload: {
            userName: '2111100149',
            passWord: '111111',
          },
          callback: () => {
            this.props.dispatch({
              type: 'login/savePassword',
              payload: {
                passWord: this.state.passWord,
              },
            });
          },
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="bootContent login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem hasFeedback className="login-form-item">
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username"
                onChange={(e) => {
                  this.setState({
                    userName: e.target.value,
                  });
                }}
              />
            )}
          </FormItem>
          <FormItem hasFeedback className="login-form-item">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password"
                onChange={(e) => {
                  this.setState({
                    passWord: e.target.value,
                  });
                }}
              />
            )}
          </FormItem>
          <FormItem className="login-form-item">
            <Button type="primary" htmlType="submit" className="login-button">
              登录
            </Button>
          </FormItem>
          <a>注册</a>
        </Form>
      </div>
    );
  }
}

export default connect(({ login }) => ({ login }))(Form.create()(Login));
