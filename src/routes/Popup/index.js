import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { DanaoWrapper } from '../../components';
import { Scrollbars } from 'react-custom-scrollbars';
import './popup.less';
import '../../assets/iconfont/iconfont.css';

class Popup extends Component {
  constructor() {
    super();
    this.state = {
      fileList: [
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: '这几年比比基金比较比较死板计算我计算基金四季随机积极记笔记比赛即将司机设计师',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: '这几年比比基金比较比较死板计算我计算基金四季随机积极记笔记比赛即将司机设计师',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: '这几年比比基金比较比较死板计算我计算基金四季随机积极记笔记比赛即将司机设计师',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: '这几年比比基金比较比较死板计算我计算基金四季随机积极记笔记比赛即将司机设计师',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: '这几年比比基金比较比较死板计算我计算基金四季随机积极记笔记比赛即将司机设计师',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: '这几年比比基金比较比较死板计算我计算基金四季随机积极记笔记比赛即将司机设计师',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: '这几年比比基金比较比较死板计算我计算基金四季随机积极记笔记比赛即将司机设计师',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
        {
          fileName: 'jbubjijbi',
          id: 0,
          statusMessage: '已完成',
          size: 20,
        },
      ]
    };
  }
  componentDidMount() {
    if (this.props.location.pathname === '/') {
      this.props.dispatch(routerRedux.push('/login'));
    }
  }
  render() {
    return (
      <div id="popup">
        <div className="tab">
          <span className="tabData iconfont icon-xiangqing1"><span>数据</span></span>
          <span className="tabPortrait iconfont icon-huaxiang"><span>画像</span></span>
        </div>
        <DanaoWrapper>
          {/*档案模态框*/}
          <div id="archivesModal">
            <div className="originalTextOperate">
              <div className="retract">
                <i className="iconfont icon-shouqi" style={{ fontSize: '16px'}}></i>
                <span className="retractSpan">收起</span>
              </div>
              <div className="view">
                <i className="iconfont icon-wenbenzhantie"></i>
                <span className="viewSpan">查看原文</span>
              </div>
            </div>
            <div className="modal-header text-center">
              <span>洞察档案</span>
              {/*<span className="pull-right archivesModalClose"><i className="iconfont icon-htmal5icon19"></i></span>*/}
            </div>
            <div className="modal-content">
              <div className="archivesAudio">
                <div id="audioEle"></div>
              </div>
              <div className="insightTextWrap" style={{ boxSizing: 'border-box'}}>
              </div>
              <div className="insightTermWrap">
              </div>
            </div>
          </div>
          {/*已识别文件*/}
          <div id="recognized-file">
            <div id="top">
              <div className="title">
                已识别文件
              </div>
            </div>
            <div id="search">
              <div className="total">
                共计 <span className="total-number">0</span> 个文件
              </div>
            </div>
            <Scrollbars>
              <ul id="file-list">
                {
                  this.state.fileList.map((item, index) => (
                    <li className="file-item" data-name={item.id} data-status={item.statusMessage}>
                      <span className="item-name">{item.fileName}</span>
                      <span className="item-size">{item.size}</span>
                    </li>
                  ))
                }
              </ul>
            </Scrollbars>
          </div>
        </DanaoWrapper>
      </div>
    );
  }
}
export default connect(({ home }) => ({ home }))(Popup);
