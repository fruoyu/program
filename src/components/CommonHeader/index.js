import React, { Component } from 'react';
import { Icon } from 'antd';
import { routerRedux } from "dva/router";
import { connect } from "dva";

class MainWrapper extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    const { title, isMain, isUserPort, goback } = this.props;
    return (
      <div>
        {/* 头部信息 */}
        <div className="header">
          <div><span className="logo">M O X I 摩西洞察</span><span className="fenge">|</span>{title}</div>
        </div>
        {
          isMain && <div
            className="shouye"
            onClick={() => {
              // this.props.dispatch(routerRedux.push('/main')); // 跳转到首页
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
              this.props.dispatch(routerRedux.goBack());
              console.log('返回');
            }}
          >
            <Icon type="arrow-right" className="iconfont icon-qianwang" />
            <span className="back">返回</span>
          </div>
        }
      </div>
    );
  }
}
export default connect(({ login }) => ({ login }))(MainWrapper);
