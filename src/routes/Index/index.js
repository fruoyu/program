import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, Form, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';

import './index.less';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      bool: true,
      menuList: [
        {
          key: '1',
          content: '首页',
          route: '/index/home',
        },
        {
          key: '2',
          content: '我的客户',
          route: '/index/main',
        },
        {
          key: '3',
          content: '报表管理',
          route: '/index/table',
        },
        {
          key: '4',
          content: '系统管理',
          route: '/main/table',
        },
      ],
    };
  }
  componentWillMount(){
    const router = this.props.location.pathname;
    let key = [];
    if (router === '/index/home') {
      key = ['1'];
    } else if (router === '/index/main') {
      key = ['2'];
    } else if (router === '/index/table') {
      key = ['3'];
    }
    sessionStorage.defaultSelectedKeys = JSON.stringify(key);
    this.props.dispatch({
      type: 'index/changeRouterMsg',
      payload: {
        defaultSelectedKeys: key,
      },
    });
  }
  toggFn() {
    this.setState({
      bool: !this.state.bool,
    });
  }
  gotoFn(info) {
    const infoObj = this.state.menuList.filter((item) => {
      return item.key === info.key;
    });
    if (infoObj[0].route && infoObj[0].route.length > 0) {
      this.props.dispatch(routerRedux.push(infoObj[0].route));
    };
    this.props.dispatch({
      type: 'index/changeRouterMsg',
      payload: {
        defaultSelectedKeys: [info.key],
      },
    });
  }
  render() {
    console.log(this.props.index.defaultSelectedKeys)
    return (
      <Layout>
        <div className="header">
          <Button onClick={this.toggFn.bind(this)}>Header</Button>
          <p>
            <Icon type="user" style={{ marginRight: 10, fontSize: 20 }} />
            <span>admin</span>
          </p>
        </div>
        <div style={{ height: '100%', width: '100%', display: 'flex' }}>
          <div style={{ width: 100 }}>
            {
              this.state.bool && <div style={{ width: 100, background: '#fff', height: '100%' }}>
                <Menu defaultSelectedKeys={this.props.index.defaultSelectedKeys.length ? this.props.index.defaultSelectedKeys : sessionStorage.defaultSelectedKeys && JSON.parse(sessionStorage.defaultSelectedKeys).length ? JSON.parse(sessionStorage.defaultSelectedKeys) : ['1']} mode="inline" onClick={(item) => { this.gotoFn(item); }}>
                  {
                    this.state.menuList.map((item) => {
                      return (
                        <Menu.Item key={item.key}>
                          <span>{item.content}</span>
                        </Menu.Item>
                      );
                    })
                  }
                </Menu>
              </div>
            }
          </div>
          <Scrollbars style={{ flex: 1, paddingLeft: 33, paddingRight: 133 }} autoHide>
            {this.props.children}
          </Scrollbars>
        </div>
      </Layout>
    );
  }
}

export default connect(({ index }) => ({ index }))(Form.create()(Index));
