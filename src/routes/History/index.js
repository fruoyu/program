import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, DatePicker, Menu, Dropdown, Form, Input } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { routerRedux } from 'dva/router';
import './history.less';
import {
  PolyDialog,
} from '../../components';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class History extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      changePassword: false,
      isDownOne: 'down',
      isDownTwo: 'down',
      manager: '',
      status: '任务状态',
      statusList: [
        {
          key: '0',
          status: '全部',
        },
        {
          key: '1',
          status: '未完成',
        },
        {
          key: '2',
          status: '已完成',
        },
        {
          key: '3',
          status: '分析中',
        },
      ],
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }
  componentDidMount() {
  }
  onChange(date, dateString) {
    console.log(date, dateString);
  }
  choseStatus(item) {
    this.setState({
      status: this.state.statusList[item.key].status,
      isDownTwo: 'down',
    });
  }
  searchMember() {
    this.setState({
      disabled: false,
    });
  }
  render() {
    const menu = (
      <Menu
        onClick={(item) => {
          this.choseStatus(item);
        }}
      >
        {
          this.state.statusList.map((item) => {
            return (
              <Menu.Item key={item.key} className="list-item">{item.status}</Menu.Item>
            );
          })
        }
      </Menu>
    );

    const menuUser = (
      <Menu>
        <Menu.Item key="0" className="list-item" disabled={this.state.disabled}>
          <input type="text" className="input-founder" placeholder="输入创建人名称" />
          <Icon
            type="right-circle-o"
            className="iconfont icon-qianwang"
            style={{
              position: 'absolute',
              top: 12,
              right: 5,
              fontSize: 24,
              color: '#ccc',
            }}
            onClick={this.searchMember.bind(this)}
          />
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="bootContent">
        <div className="shouye">
          <Icon type="home" className="iconfont icon-lishijilu" />
          <span className="home" >首页</span>
        </div>
        <div className="history">
          <Icon type="solution" className="iconfont icon-lishijilu" />
          <span className="his">历史记录</span>
        </div>
        <div className="shezhi">
          <Icon type="user" className="iconfont icon-yonghu2" />
          <div className="shezhi-content">
            <p className="modify" onClick={() => { this.setState({ changePassword: true }); }}>修改密码</p>
            <p className="exit">退出</p>
          </div>
        </div>
        <Scrollbars style={{ flex: 1, paddingLeft: 33, paddingRight: 133 }} autoHide>
          {/* 头部信息 */}
          <div className="header">
            <div><span className="logo">M O X I 摩西洞察</span><span className="fenge">|</span>历史任务</div>
          </div>

          <div id="content">
            <div className="content-head">
              <div className="ch-top">
                <div className="search-input">
                  <input type="text" placeholder="搜索内容" />
                  <Icon type="right-circle-o" className="iconfont icon-qianwang" />
                </div>
                <div className="search-condition">
                  {/* 创建人搜索 */}
                  <div className="founder click-item founders">
                    <Dropdown overlay={menuUser} trigger={['click']}>
                      <span className="ant-dropdown-link" href="#">
                        创建人
                        <Icon type={this.state.isDownOne} />
                      </span>
                    </Dropdown>
                  </div>
                  {/* 任务状态 */}
                  <div className="founder click-item">
                    <Dropdown overlay={menu} trigger={['click']}>
                      <span className="ant-dropdown-link" href="#">
                        {this.state.status}
                        <Icon type={this.state.isDownTwo} />
                      </span>
                    </Dropdown>
                  </div>
                </div>
                <div className="search-calendar">
                  <div className="form-group d_t_dater">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <RangePicker locale onChange={this.onChange.bind(this)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="content-body">
              <div className="order">
                <div className="order-content">按上传时间排序</div>
                <ul className="order-list">
                  <li className="order-item">按上传时间排序</li>
                  <li className="order-item">按结果项数排序</li>
                </ul>
                <span className="iconfont icon-paixu" />
              </div>
            </div> */}
            <div className="content-body">
              <div className="content-main">
                <span className="dashed-circle" />
                {/* 时间title */}
                <div className="content-time">2018-8-14</div>
                {/* 列表 */}
                <ul className="content-lists">
                  <li className="content-item" data-id="'+ item2.id +'">
                    <div className="item-title">战旗-王帅-录音笔-123456.WAV
                    </div>
                    <div className="item-author">周晨</div>
                    <div className="item-state">已完成</div>
                    <div className="item-time">2018-08-14 14:15:28</div>
                    <div className="data">
                      <Icon type="solution" className="iconfont icon-xiangqing1" />
                      <span className="dataFont">数据</span>
                    </div>
                    <div className="portrait">
                      <Icon type="user" className="iconfont icon-huaxiang" />
                      <span className="portraitFont">画像</span>
                    </div>
                  </li>
                  <li className="content-item" data-id="'+ item2.id +'">
                    <div className="item-title">战旗-王帅-录音笔-123456.WAV
                    </div>
                    <div className="item-author">周晨</div>
                    <div className="item-state">已完成</div>
                    <div className="item-time">2018-08-14 14:15:28</div>
                    <div className="data">
                      <Icon type="solution" className="iconfont icon-xiangqing1" />
                      <span className="dataFont">数据</span>
                    </div>
                    <div className="portrait">
                      <Icon type="user" className="iconfont icon-huaxiang" />
                      <span className="portraitFont">画像</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="content-main">
                <span className="dashed-circle" />
                {/* 时间title */}
                <div className="content-time">2018-8-14</div>
                {/* 列表 */}
                <ul className="content-lists">
                  <li className="content-item" data-id="'+ item2.id +'">
                    <div className="item-title">战旗-王帅-录音笔-123456.WAV
                    </div>
                    <div className="item-author">周晨</div>
                    <div className="item-state">已完成</div>
                    <div className="item-time">2018-08-14 14:15:28</div>
                    <div className="data">
                      <Icon type="solution" className="iconfont icon-xiangqing1" />
                      <span className="dataFont">数据</span>
                    </div>
                    <div className="portrait">
                      <Icon type="user" className="iconfont icon-huaxiang" />
                      <span className="portraitFont">画像</span>
                    </div>
                  </li>
                  <li className="content-item" data-id="'+ item2.id +'">
                    <div className="item-title">战旗-王帅-录音笔-123456.WAV
                    </div>
                    <div className="item-author">周晨</div>
                    <div className="item-state">已完成</div>
                    <div className="item-time">2018-08-14 14:15:28</div>
                    <div className="data">
                      <Icon type="solution" className="iconfont icon-xiangqing1" />
                      <span className="dataFont">数据</span>
                    </div>
                    <div className="portrait">
                      <Icon type="user" className="iconfont icon-huaxiang" />
                      <span className="portraitFont">画像</span>
                    </div>
                  </li>
                  <li className="content-item" data-id="'+ item2.id +'">
                    <div className="item-title">战旗-王帅-录音笔-123456.WAV
                    </div>
                    <div className="item-author">周晨</div>
                    <div className="item-state">已完成</div>
                    <div className="item-time">2018-08-14 14:15:28</div>
                    <div className="data">
                      <Icon type="solution" className="iconfont icon-xiangqing1" />
                      <span className="dataFont">数据</span>
                    </div>
                    <div className="portrait">
                      <Icon type="user" className="iconfont icon-huaxiang" />
                      <span className="portraitFont">画像</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="content-main">
                <span className="dashed-circle" />
                {/* 时间title */}
                <div className="content-time">2018-8-18</div>
                {/* 列表 */}
                <ul className="content-lists">
                  <li className="content-item" data-id="'+ item2.id +'">
                    <div className="item-title">战旗-王帅-录音笔-123456.WAV
                    </div>
                    <div className="item-author">周晨</div>
                    <div className="item-state">已完成</div>
                    <div className="item-time">2018-08-14 14:15:28</div>
                    <div className="data">
                      <Icon type="solution" className="iconfont icon-xiangqing1" />
                      <span className="dataFont">数据</span>
                    </div>
                    <div className="portrait">
                      <Icon type="user" className="iconfont icon-huaxiang" />
                      <span className="portraitFont">画像</span>
                    </div>
                  </li>
                  <li className="content-item" data-id="'+ item2.id +'">
                    <div className="item-title">战旗-王帅-录音笔-123456.WAV
                    </div>
                    <div className="item-author">周晨</div>
                    <div className="item-state">已完成</div>
                    <div className="item-time">2018-08-14 14:15:28</div>
                    <div className="data">
                      <Icon type="solution" className="iconfont icon-xiangqing1" />
                      <span className="dataFont">数据</span>
                    </div>
                    <div className="portrait">
                      <Icon type="user" className="iconfont icon-huaxiang" />
                      <span className="portraitFont">画像</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Scrollbars>
        {/* 修改密码弹框 */}
        {
          this.state.changePassword && <PolyDialog
            title="修改密码"
            visible={this.state.changePassword}
            onClose={() => {
              this.setState({ changePassword: false });
            }}
            onOk={() => {
              // this.setState({ changePassword: false });
            }}
            onCancel={() => {
              // this.setState({ changePassword: false });
            }}
          >
            <div className="login-form">
              <div label="旧密码">
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
              <div label="新密码">
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
              <div label="确认密码">
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

export default connect(({ history }) => ({ history }))(Form.create()(History));
