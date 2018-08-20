import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {
  DanaoWrapper,
  CommonHeader,
} from '../../components';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';
// import '../../assets/css/daterangepicker.css';
// import '../../assets/css/pagination.css';
// import '../../assets/css/public.css';
import './popup.less';
import '../../assets/iconfont/iconfont.css';
// import '../../plugs/audio/audio.js';
import '../../plugs/audio/audio.css';

class Popup extends Component {
  constructor() {
    super();
    this.state = {
      fileList: [
        {
          createTime: "2018-08-14 14:15:28.0",
          dialogueContent: "",
          fileName: "战旗-王帅-录音笔-123456.WAV",
          filePath: "/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV",
          id: 24,
          insightResult: "",
          lastUpdateTime: "2018-08-14 14:15:28.0",
          md5: "",
          size: "9.5MB",
          statusMessage: "done",
          systemId: 0,
          taskid: "",
          userId: "11024400000050",
          userName: "周晨",
        },
        {
          createTime: "2018-08-14 14:15:28.0",
          dialogueContent: "",
          fileName: "战旗-王帅-录音笔-123456.WAV",
          filePath: "/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV",
          id: 24,
          insightResult: "",
          lastUpdateTime: "2018-08-14 14:15:28.0",
          md5: "",
          size: "9.5MB",
          statusMessage: "done",
          systemId: 0,
          taskid: "",
          userId: "11024400000050",
          userName: "周晨",
        },
        {
          createTime: "2018-08-14 14:15:28.0",
          dialogueContent: "",
          fileName: "战旗-王帅-录音笔-123456.WAV",
          filePath: "/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV",
          id: 24,
          insightResult: "",
          lastUpdateTime: "2018-08-14 14:15:28.0",
          md5: "",
          size: "9.5MB",
          statusMessage: "done",
          systemId: 0,
          taskid: "",
          userId: "11024400000050",
          userName: "周晨",
        },
        {
          createTime: "2018-08-14 14:15:28.0",
          dialogueContent: "",
          fileName: "战旗-王帅-录音笔-123456.WAV",
          filePath: "/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV",
          id: 24,
          insightResult: "",
          lastUpdateTime: "2018-08-14 14:15:28.0",
          md5: "",
          size: "9.5MB",
          statusMessage: "done",
          systemId: 0,
          taskid: "",
          userId: "11024400000050",
          userName: "周晨",
        },
        {
          createTime: "2018-08-14 14:15:28.0",
          dialogueContent: "",
          fileName: "战旗-王帅-录音笔-123456.WAV",
          filePath: "/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV",
          id: 24,
          insightResult: "",
          lastUpdateTime: "2018-08-14 14:15:28.0",
          md5: "",
          size: "9.5MB",
          statusMessage: "done",
          systemId: 0,
          taskid: "",
          userId: "11024400000050",
          userName: "周晨",
        },
        {
          createTime: "2018-08-14 14:15:28.0",
          dialogueContent: "",
          fileName: "战旗-王帅-录音笔-123456.WAV",
          filePath: "/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV",
          id: 24,
          insightResult: "",
          lastUpdateTime: "2018-08-14 14:15:28.0",
          md5: "",
          size: "9.5MB",
          statusMessage: "done",
          systemId: 0,
          taskid: "",
          userId: "11024400000050",
          userName: "周晨",
        },
        {
          createTime: "2018-08-14 14:15:28.0",
          dialogueContent: "",
          fileName: "战旗-王帅-录音笔-123456.WAV",
          filePath: "/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV",
          id: 24,
          insightResult: "",
          lastUpdateTime: "2018-08-14 14:15:28.0",
          md5: "",
          size: "9.5MB",
          statusMessage: "done",
          systemId: 0,
          taskid: "",
          userId: "11024400000050",
          userName: "周晨",
        },
        {
          createTime: "2018-08-14 14:15:28.0",
          dialogueContent: "",
          fileName: "战旗-王帅-录音笔-123456.WAV",
          filePath: "/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV",
          id: 24,
          insightResult: "",
          lastUpdateTime: "2018-08-14 14:15:28.0",
          md5: "",
          size: "9.5MB",
          statusMessage: "done",
          systemId: 0,
          taskid: "",
          userId: "11024400000050",
          userName: "周晨",
        },
        {
          createTime: "2018-08-14 14:15:28.0",
          dialogueContent: "",
          fileName: "战旗-王帅-录音笔-123456.WAV",
          filePath: "/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV",
          id: 24,
          insightResult: "",
          lastUpdateTime: "2018-08-14 14:15:28.0",
          md5: "",
          size: "9.5MB",
          statusMessage: "done",
          systemId: 0,
          taskid: "",
          userId: "11024400000050",
          userName: "周晨",
        },
        {
          createTime: "2018-08-14 14:15:28.0",
          dialogueContent: "",
          fileName: "战旗-王帅-录音笔-123456.WAV",
          filePath: "/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV",
          id: 24,
          insightResult: "",
          lastUpdateTime: "2018-08-14 14:15:28.0",
          md5: "",
          size: "9.5MB",
          statusMessage: "done",
          systemId: 0,
          taskid: "",
          userId: "11024400000050",
          userName: "周晨",
        },
      ],
      customer: {
        CUSTOMER_CHILD: '子女信息',
        CUSTOMER_AGE:'年龄',
        CUSTOMER_SEX:'性别',
        CUSTOMER_MERRIGE:'婚姻状况',
        CUSTOMER_JOB:'从事行业',
        CONSUME_HOUSE:'房产情况',
        CONSUME_CAR:'车辆情况',
        SOCIAL_SECURITY:'社保',
        COMMERCIAL_INSURANCE:'商保',
        INSURANCE_PURCHASER:'保险购买人',
        INVESTMENT_TYPE:'投资类型',
        INVESTMENT_PURCHASER:'投资打理人',
        INVESTMENT_RATIO:'投资占比',
        INVESTMENT_DURATION:'投资时长',
        RISK_PREFERENCE:'理财风险偏好',
        CUSTOMER_HOBBY:'爱好的活动',
        CUSTOMER_ADMIRE:'欣赏什么样的人'
      },
      labellist: {
        COMMERCIAL_INSURANCE: [],
        CONSUME_CAR: [],
        CONSUME_HOUSE: [],
        CUSTOMER_ADMIRE: [],
        CUSTOMER_AGE: [
          {
            context: "这个表姐。它说到后台的时候发后台呢就直接给我们那个后台推广部就直接到党了，因为它是属于拍摄那种，",
            id: "78d9ff98-6233-4cfd-9c2d-a31b1352677e",
            status: "true",
            time: "31790",
            type: "CUSTOMER_CHILD",
          },
        ],
        CUSTOMER_CHILD: [
          {
            context: "这个表姐。它说到后台的时候发后台呢就直接给我们那个后台推广部就直接到党了，因为它是属于拍摄那种，",
            id: "78d9ff98-6233-4cfd-9c2d-a31b1352677e",
            status: "false",
            time: "31790",
            type: "CUSTOMER_CHILD",
          },
        ],
        CUSTOMER_HOBBY: [],
        CUSTOMER_JOB: [],
        CUSTOMER_MERRIGE: [],
        CUSTOMER_SEX: [],
        INSURANCE_PURCHASER: [],
        INVESTMENT_DURATION: [],
        INVESTMENT_PURCHASER: [],
        INVESTMENT_RATIO: [],
        INVESTMENT_TYPE: [],
        RISK_PREFERENCE: [],
        SOCIAL_SECURITY: [],
      },
      clickIndex: 0,
      hoverIndex: -1,
      isPlay: false,
      isOriginal: false,
    };
  }
  componentDidMount() {
    if (this.props.location.pathname === '/') {
      this.props.dispatch(routerRedux.push('/login'));
    }
  }

  formatSeconds = (s) => {
    let t;
    if (s > -1) {
      const hour = Math.floor(s / 3600);
      const min = Math.floor(s / 60) % 60;
      const sec = s % 60;
      if (hour < 10) {
        t = '0' + hour + ':';
      } else {
        t = hour + ':';
      }

      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec;
    }
    return t;
  }

  renderTermWrap = () => {
    return (
      <div className="insightTermWrap">
        <Scrollbars>
            {
              Object.keys(this.state.customer).map((item, index) => (
                <div className="insightTerm" data-type={item} key={index}>
                  <div className="insightTermTitle">
                    <p>{this.state.customer[item]}:</p>
                    <div>
                      <input data-name={item} type="text" className="insightName" disabled></input>
                    </div>
                    <span className="insightTermNamedit pull-right" data-type={item}>
                      <i className="iconfont icon-xiugai"></i>
                      <i className="iconfont icon-gou1"></i>
                    </span>
                  </div>
                  <div className="insightTermContent">
                    <div className="digTitle">挖掘出的语句</div>
                    {
                      this.state.labellist[item].map((labelItem, labelIndex) => (
                        <div className="digSentenceWrap" data-time={parseInt(labelItem.time / 1000)} data-boolean={labelItem.status} key={labelIndex}>
                          <div className="digSentence">
                            <p className={labelItem.status == 'true' ? '' : 'line-through'}>{this.formatSeconds(parseInt(labelItem.time / 1000))}</p>
                            <p className={['content', labelItem.status == 'true' ? '' : 'line-through'].join(" ")}>
                              {labelItem.context}
                              <i className="audioJump iconfont icon-yuyin1-copy"></i>
                            </p>
                            <div className="arrow">
                              <i className="iconfont icon-sanjiaoright"></i>
                            </div>
                          </div>
                          <div className="border-wrap"></div>
                          {
                            labelItem.status == 'true' ?
                              <div className="sentenceDel" data-name={0}>
                                <i className="iconfont icon-cuowu"></i>
                              </div> :
                              <div className="sentenceRight" data-name={0}>
                                <i className="iconfont icon-gou1"></i>
                              </div>
                          }
                        </div>

                      ))
                    }

                  </div>
                </div>
              ))
            }
        </Scrollbars>
      </div>
    )
  }

  renderTextWrap = () => {
    return (
      <div className="insightTextWrap" style={{ boxSizing: 'border-box', }}>
      </div>
    )
  }

  renderAudio = () => {
    return (
      <div className="archivesAudio">
        <div id="audioEle">
          <div className="wx-audio-content" style={{ width: '100%' }}>
            <audio className="wx-audio-content" src={{uri: "http://47.95.113.97:8660/file/20180817121908967空战军-测试-张玉龙-1234.mp3"}}></audio>
            <div className="wx-audio-right">
              <p className="middleX"></p>
              <div className="wx-audio-time">
                <span className="current-t">00:00</span>
                <span className="duration-t">33:44</span>
              </div>
              <div className="wx-audio-progrees">
                <div className="wx-progrees-detail">
                  <span className="wx-voice-p"></span>
                  <span className="wx-buffer-p"></span>
                  <span className="wx-loading">
                    <span className="wx-loading-wrapper"></span>
                  </span>
                </div>
                <div className="wx-audio-origin"></div>
              </div>
            </div>
            <div className="wx-audio-left">
              <i className={['iconfont', this.state.isPlay ? "icon-zanting" : "icon-bofang"].join(' ')} onClick={() => {
                if (this.state.isPlay) {
                  this.setState({
                    isPlay: false,
                  })
                } else {
                  this.setState({
                    isPlay: true,
                  })
                }
              }}></i>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="popup">
        {/* 头部信息 */}
        <CommonHeader title="洞察结果" goback home />
        <div className="tab">
          <span className="tabData iconfont icon-xiangqing1"><span>数据</span></span>
          <span className="tabPortrait iconfont icon-huaxiang" onClick={() => { this.props.dispatch(routerRedux.push('/userPortrait')); }}><span>画像</span></span>
        </div>
        <DanaoWrapper>
          <div id="archivesModal" className={this.state.isOriginal ? "archivesBigModal" : ""}>
            <div className="originalTextOperate">
              {
                this.state.isOriginal ?
                <div className="retract" onClick={() => {
                  this.setState({
                    isOriginal: false,
                  })
                }}>
                  <i className="iconfont icon-shouqi" style={{ fontSize: '16px'}}></i>
                  <span className="retractSpan">收起</span>
                </div> :
                <div className="view" onClick={() => {
                  this.setState({
                    isOriginal: true,
                  })
                }}>
                  <i className="iconfont icon-wenbenzhantie"></i>
                  <span className="viewSpan">查看原文</span>
                </div>
              }
            </div>
            <div className="modal-header text-center" style={{top: this.state.isOriginal ? "1.4%" : ""}}>
              <span>洞察档案</span>
            </div>
            <div className="modal-content">
              {
                this.renderAudio()
              }
              {
                this.state.isOriginal ? this.renderTextWrap() : this.renderTermWrap()
              }
            </div>
          </div>
          <div id="recognized-file">
            <div id="top">
              <div className="title">
                已识别文件
              </div>
            </div>
            <div id="search">
              <div className="total">
                共计 <span className="total-number">{this.state.fileList.length}</span> 个文件
              </div>
            </div>
            <Scrollbars>
              <ul id="file-list">
                {
                  this.state.fileList.map((item, index) => (
                    <li className={['file-item', index == this.state.clickIndex ? 'item-active-2' : '', index == this.state.hoverIndex ? 'item-active' : ''].join(' ')} data-name={item.id} data-status={item.statusMessage} key={index}
                      onClick={() => {
                        this.setState({
                          clickIndex: index,
                        });
                      }}
                      onMouseEnter={() => {
                        this.setState({
                          hoverIndex: index,
                        });
                      }}
                      onMouseLeave={() => {
                        this.setState({
                          hoverIndex: -1,
                        });
                      }}>
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
