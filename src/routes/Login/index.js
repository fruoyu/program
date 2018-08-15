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
    this.props.dispatch({
      type: 'login/saveLoginMsg',
      payload: {
        endTime:'',
        fileName:''	,
        name:'',
        pageNum:0,
        pageSize:10,
        startTime: '',
        status: ''
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
  render() {
    return (
      <div className="bootContent login">
            <Button htmlType="submit" className="login-button" onClick={this.handleSubmit.bind(this)}>
              登录
            </Button>
      </div>
    );
  }
}

export default connect(({ login }) => ({ login }))(Form.create()(Login));
