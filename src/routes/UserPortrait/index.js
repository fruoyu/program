import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Input } from 'antd';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';
import './userPortrait.less';
import {
  PolyDialog,
  CommonHeader,
} from '../../components';


class UserPortrait extends Component {
  constructor() {
    super();
    this.state = {
      changePassword: false,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      $('.dashed').slideDown('slow');
    }, 1000);
  }

  render() {
    return (
      <div className="bootContent">
        {/* 用户退出 */}
        <div className="shezhi">
          <Icon type="user" className="iconfont icon-yonghu2" />
          <div className="shezhi-content">
            <p className="modify" onClick={() => { this.setState({ changePassword: true }); }}>修改密码</p>
            <p className="exit">退出</p>
          </div>
        </div>
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部 */}
          <CommonHeader
            title="用户画像"
            goback
          />
          {/* 画像 */}
          <div id="main">
            <div className="userPortrait">
              <div className="tab">
                <span className="tabData iconfont icon-xiangqing1"><Icon type="solution" /><span>数据</span></span>
                <span className="tabPortrait iconfont icon-huaxiang"><Icon type="user" /><span>画像</span></span>
              </div>
              <div className="title">
                用户画像
              </div>
              <div className="saomiao">
                <div className="guangbiao"></div>
              </div>
              <div className="dashed jiating leftdashed">
                <div className="yuan"></div>
                <div className="xiexian"></div>
                <div className="content">
                  <div className="img">
                    <img src={require('../../assets/image/icon_03.png')} style={{ width: '100%"' }} />
                  </div>
                  <div className="ul">
                    <h3>家庭结构</h3>
                    <ul>
                      <li><span className="item">子女 :</span><span className="CUSTOMER_CHILD">数据</span></li>
                      <li><span>年龄 :</span><span className="CUSTOMER_AGE">18</span></li>
                      <li><span>性别 :</span><span className="CUSTOMER_SEX"></span></li>
                      <li><span>婚姻 :</span><span className="CUSTOMER_MERRIGE"></span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="dashed goumaili leftdashed">
                <div className="yuan"></div>
                <div className="xiexian"></div>
                <div className="content">
                  <div className="img">
                    <img src={require('../../assets/image/icon_12.png')} style={{ width: '100%"' }} />
                  </div>
                  <div className="ul">
                    <h3>购买力</h3>
                    <ul>
                      <li><span>从事行业 :</span><span className="CUSTOMER_JOB"></span></li>
                      <li><span>房产情况 :</span><span className="CONSUME_HOUSE"></span></li>
                      <li><span>车辆情况 :</span><span className="CONSUME_CAR"></span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="dashed xingquaihao leftdashed">
                <div className="yuan"></div>
                <div className="xiexian"></div>
                <div className="content">
                  <div className="img">
                    <img src={require('../../assets/image/icon_05.png')}  />
                  </div>
                  <div className="ul">
                    <h3>兴趣爱好</h3>
                    <ul>
                      <li><span>爱好的活动 :</span><span className="CUSTOMER_HOBBY"></span></li>
                      <li><span>欣赏什么样的人 :</span><span className="CUSTOMER_ADMIRE"></span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="dashed baoxian rightdashed">
                <div className="yuan rightyuan"></div>
                <div className="xiexian leftxiexian"></div>
                <div className="content">
                  <div className="img" style={{ float: 'right' }}>
                    <img src={require('../../assets/image/icon_14.png')} style={{ width: '100%"' }} />
                  </div>
                  <div className="ul">
                    <h3>保险情况</h3>
                    <ul>
                      <li><span>社保 :</span><span className="SOCIAL_SECURITY"></span></li>
                      <li><span>商保 :</span><span className="COMMERCIAL_INSURANCE"></span></li>
                      <li><span>保险购买人 :</span><span className="INSURANCE_PURCHASER"></span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="dashed touzi rightdashed">
                <div className="yuan rightyuan"></div>
                <div className="xiexian leftxiexian"></div>
                <div className="content">
                  <div className="img" style={{ float: 'right' }}>
                    <img src={require('../../assets/image/icon_07.png')} style={{ width: '100%"' }} />
                  </div>
                  <div className="ul">
                    <h3>投资情况</h3>
                    <ul>
                      <li><span>投资类型 :</span><span className="INVESTMENT_TYPE"></span></li>
                      <li><span>投资打理人 :</span><span className="INVESTMENT_PURCHASER"></span></li>
                      <li><span>各项投资占比 :</span><span className="INVESTMENT_RATIO"></span></li>
                      <li><span>投资时长 :</span><span className="INVESTMENT_DURATION"></span></li>
                      <li><span>理财风险偏好 :</span><span className="RISK_PREFERENCE"></span></li>
                    </ul>
                  </div>
                </div>
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
              this.setState({ changePassword: false });
            }}
            onCancel={() => {
              this.setState({ changePassword: false });
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

export default connect(({ login }) => ({ login }))(UserPortrait);
