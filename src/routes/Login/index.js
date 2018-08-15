import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Button, Form, Input, Checkbox } from 'antd';
import { routerRedux } from 'dva/router';
import './login.less';

const FormItem = Form.Item;

class Login extends Component {
  constructor() {
    super();
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
  handleStorage = (props) => {
    const storage = window.localStorage;
    if (!props) {
      return {
        userName: storage.getItem('username'),
        passWord: storage.getItem('password'),
      };
    } else {
      return {
        userName: storage.setItem('username', props.userName),
        passWord: storage.setItem('password', props.passWord),
      };
    }
  }
  handleSubmit = (e) => {
    this.props.dispatch({
      type: 'login/saveLoginMsg',
      payload: {
        endTime: '',
        fileName: '',
        name: '',
        pageNum: 0,
        pageSize: 10,
        startTime: '',
        status: '',
      },
      callback: () => {
        // this.props.dispatch({
        //   type: 'login/savePassword',
        //   payload: {
        //     passWord: this.state.passWord,
        //   },
        // });
      },
    });
  }
  handleCheck = (e) => {
    const tar = e.target.checked;
    if (tar) this.handleStorage({ userName: this.state.userName, passWord: this.state.passWord });
    else window.localStorage.clear();
  }
  render() {
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
                />
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
                />
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
                <Checkbox onChange={this.handleCheck}>记住密码</Checkbox>
              )}
            </FormItem>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(({ login }) => ({ login }))(Form.create()(Login));
