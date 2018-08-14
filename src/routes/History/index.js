import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import './history.less';


class History extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="bootContent">
        {/* 头部信息 */}
        <div className="header">
          <div><span className="logo">M O X I 摩西洞察</span><span className="fenge">|</span>历史任务</div>
        </div>
        <div className="shouye">
          <Icon type="home" className="iconfont icon-lishijilu" />
          <span className="home" >首页</span>
        </div>
        <div className="history">
          <Icon type="solution" className="iconfont icon-lishijilu" />
          <span className="his">历史记录</span>
      </div>

        <div id="content">
          <div className="content-head">
            <div className="ch-top">
              <div className="search-input">
                <input type="text" placeholder="搜索内容" />
                  <span className="iconfont icon-qianwang"></span>
              </div>
              <div className="search-condition">
                <div className="founder click-item">
                  <span className="mr-15">创建人</span>
                  <span className="iconfont icon-down-trangle zhankai"></span>

                  {/*弹窗*/}
                  <div className="trans-item trans-item-founder">
                    <div className="input-wrap">
                      <input type="text" className="input-founder" placeholder="输入创建人名称" />
                        <span className="iconfont icon-qianwang"></span>
                    </div>
                    <div className="founder-list"></div>
                  </div>

                </div>
                <div className="task-state click-item">
                  <span className="mr-15">任务状态</span>
                  <span className="iconfont icon-down-trangle zhankai"></span>
                  {/*弹窗*/}
                  <div className="trans-item trans-item-state">
                    <div className="task-state-list">
                      <span className="list-item" value="">全部</span>
                      <span className="list-item" value="delete">未完成</span>
                      <span className="list-item" value="done">已完成</span>
                      <span className="list-item" value="analysing">分析中</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="search-calendar">
                <div className="form-group d_t_dater">
                  <label className="col-sm-3 control-label"></label>
                  <div className="col-sm-12">
                    <div className="input-group">
                      <button type="button" className="btn btn-default" id="daterange-btn">
                    <span>
                      <i className="icon iconfont icon-calendar1"></i>请选择日期
                    </span>
                        <i className="icon iconfont icon-danxian-youjiantou-copy"></i>
                        <i className="iconfont icon-rili"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <div className="order">
              <div className="order-content">按上传时间排序</div>
              <ul className="order-list">
                <li className="order-item">按上传时间排序</li>
                <li className="order-item">按结果项数排序</li>
              </ul>
              <span className="iconfont icon-paixu"></span>
            </div>
          </div>
          <div className="m-style"></div>
        </div>
      </div>
    )
  }
}

export default connect(({ history }) => ({ history }))(History);
