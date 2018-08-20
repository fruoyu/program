import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Button, Form, Input, Checkbox } from 'antd';
import { routerRedux } from 'dva/router';
import { notifyError } from '../../services/app.js';

import './login.less';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      userName: '123',
      passWord: '',
    };
  }
  componentWillMount() {
    const storage = window.localStorage;
    const uname = storage.getItem('username');
    const pword = storage.getItem('password');
    if (uname) { this.setState({ userName: uname, passWord: pword }); }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        /* 浏览器是否保存密码 */
        if (values.remember) {
          const storage = window.localStorage;
          storage.username = this.state.userName;
          storage.password = this.state.passWord;
        } else window.localStorage.clear();
        /* 提交登录 */
        this.props.dispatch({
          type: 'login/saveLoginMsg',
          payload: {
            userName: this.state.userName,
            password: this.state.passWord,
          },
          callback: (data) => {
            if (data) this.props.dispatch(routerRedux.push('/main'));
            else notifyError('账户或密码错误！');
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
          <div className="login-wrap">
            <FormItem hasFeedback className="login-form-item">
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名"
                  onChange={(e) => {
                    this.setState({
                      userName: e.target.value,
                    });
                  }}
                />,
              )}
            </FormItem>
            <FormItem hasFeedback className="login-form-item">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码"
                  onChange={(e) => {
                    this.setState({
                      passWord: e.target.value,
                    });
                  }}
                />,
              )}
            </FormItem>
            <FormItem className="login-form-item mt">
              <Button type="primary" htmlType="submit" className="login-button">
                登录
              </Button>
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: false,
              })(
                <Checkbox>记住密码</Checkbox>,
              )}
            </FormItem>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(({ login }) => ({ login }))(Form.create()(Login));
