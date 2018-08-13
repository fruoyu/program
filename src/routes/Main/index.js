import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Table, Button, Form, Input } from 'antd';
import { routerRedux } from 'dva/router';
import './main.less';

const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
// this.props.dispatch(routerRedux.push('/StandardOrder')); // 路由跳转


class Main extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }
  componentDidMount() {
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: 'Action',
        key: 'action',
        render: () => {
          return (
            <Button
              type="primary"
              onClick={() => {
                // this.props.dispatch(routerRedux.goBack());
              }}
            >
              Publish
            </Button>
          );
        },
      }];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }];
    return (
      <div className="bootContent">
        <div style={{ background: '#fff' }}>
          <Table columns={columns} dataSource={data} scroll={{ x: 600 }} />
          <Table columns={columns} dataSource={data} scroll={{ x: 600 }} />

          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem hasFeedback>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(({ home, index }) => ({ home, index }))(Form.create()(Main));
