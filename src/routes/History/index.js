import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, DatePicker, Input, Pagination } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { routerRedux } from 'dva/router';
import './history.less';
import '../../assets/iconfont/iconfont.css';
import $ from 'jquery';
import {
  PolyDialog,
  CommonHeader,
} from '../../components';

const { RangePicker } = DatePicker;

class History extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true, // 创建人dropdown是否可收缩
      changePassword: false, // 是否显示修改密码弹框
      isDownOne: 'down',
      isDownTwo: 'down',
      searchMaker: '', // 创建人
      status: '任务状态', // 状态选择
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
      ], // 状态选择数组
      oldPassword: '', // 旧密码
      newPassword: '', // 新密码
      confirmPassword: '', // 确定密码
    };
  }
  componentDidMount() {
  }
  // 日历操作
  onChangeFn(date, dateString) {
    console.log(date, dateString);
  }
  // 分页器改变时接口操作
  onChangePage(pageNumber) {
    console.log('Page: ', pageNumber);
  }
  // 任务状态下拉操作
  choseStatus(item) {
    this.setState({
      status: this.state.statusList[item.key].status,
      isDownTwo: 'down',
    });
  }
  // 点击创建人搜索框箭头操作
  searchMember() {
    // 调用接口
    this.setState({
      disabled: false,
    });
  }
  // 退出登录操作
  loginOut() {
    this.props.dispatch(routerRedux.push('/login'));
  }
  // 进入画像界面操作
  gotoUserPortrait() {
    this.props.dispatch(routerRedux.push('/userPortrait'));
  }
  render() {
    return (
      <div className="bootContent" onClick={(e) => {
        if($('.trans-item-founder').attr('class').indexOf('active') > -1 && $(e.target).closest('.trans-item-founder').length == 0) {
          $('.trans-item-founder').siblings('.zhankai').removeClass('rotate');
          $('.trans-item-founder').removeClass('active')
          $('.trans-item-founder').slideUp();
        }else if($('.trans-item-state').attr('class').indexOf('active') > -1 && $(e.target).closest('.trans-item-state').length == 0) {
          $('.trans-item-state').siblings('.zhankai').removeClass('rotate');
          $('.trans-item-state').removeClass('active')
          $('.trans-item-state').slideUp();
        }
      }}>
        <div className="shezhi">
          <span className="iconfont icon-yonghu2" />
          <div className="shezhi-content">
            <p className="modify" onClick={() => { this.setState({ changePassword: true }); }}>修改密码</p>
            <p className="exit" onClick={this.loginOut.bind(this)}>退出</p>
          </div>
        </div>
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部信息 */}
          <CommonHeader
            title="历史任务"
            isMain
            isUserPort
          />

          <div id="content">
            <div className="content-head">
              <div className="ch-top">
                <div className="search-input">
                  <input type="text" placeholder="搜索内容" />
                  <span className="iconfont icon-qianwang" />
                </div>
                <div className="search-condition">
                  {/* 创建人搜索 */}
                  <div className="founder click-item founders">
                    <div
                      className="founder click-item maker"
                      onClick={(e) => {
                        e.stopPropagation();
                        $('.maker').find('.zhankai').toggleClass('rotate');
                        $('.maker').find('.trans-item').slideToggle().toggleClass('active');
                        $('.maker').siblings('.click-item').find('.trans-item').slideUp().removeClass('active');
                      }}
                    >
                      <span className="mr-15">创建人</span>
                      <span className="iconfont icon-down-trangle zhankai" />

                      <div className="trans-item trans-item-founder">
                        <div className="input-wrap">
                          <input type="text" className="input-founder" placeholder="输入创建人名称" />
                          <span className="iconfont icon-qianwang" onClick={this.searchMember.bind(this)} />
                        </div>
                        <div className="founder-list" />
                      </div>

                    </div>
                  </div>
                  {/* 任务状态 */}
                  <div className="founder click-item">
                    <div
                      className="task-state click-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        $('.task-state').find('.zhankai').toggleClass('rotate');
                        $('.task-state').find('.trans-item').slideToggle().toggleClass('active');
                        $('.task-state').siblings('.click-item').find('.trans-item').slideUp().removeClass('active');
                    }}>
                      <span className="mr-15">{this.state.status}</span>
                      <span className="iconfont icon-down-trangle zhankai" />
                      <div className="trans-item trans-item-state">
                        <div className="task-state-list">
                          {
                            this.state.statusList.map((item) => {
                              return (
                                <span key={item.key} className="list-item" onClick={() => { this.setState({ status: item.status }); }}>{item.status}</span>
                              );
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="search-calendar">
                  <div className="form-group d_t_dater">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <RangePicker onChange={this.onChangeFn.bind(this)} />
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
                    <div className="item-title">战旗-王帅-录音笔-123456.WAV</div>
                    <div className="item-author">周晨</div>
                    <div className="item-state">已完成</div>
                    <div className="item-time">2018-08-14 14:15:28</div>
                    <div className="data">
                      <Icon type="solution" className="iconfont icon-xiangqing1" />
                      <span className="dataFont">数据</span>
                    </div>
                    <div className="portrait">
                      <Icon
                        type="user"
                        className="iconfont icon-huaxiang"
                        onClick={this.gotoUserPortrait.bind(this)}
                      />
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
            {/* 分页器 */}
            <Pagination
              className="my-pagination"
              defaultCurrent={1} total={50} showQuickJumper style={{ marginTop: 60 }}
              onChange={(pageNumber) => {
                this.onChangePage(pageNumber);
              }}
            />
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
            <div className="login-form-dailog">
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

export default connect(({ history }) => ({ history }))(History);
