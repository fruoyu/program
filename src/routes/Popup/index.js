import React, { Component } from 'react';
import $ from 'jquery';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'dva';
import {
  DanaoWrapper,
  CommonHeader,
} from '../../components';
// import '../../assets/css/daterangepicker.css';
// import '../../assets/css/pagination.css';
// import '../../assets/css/public.css';
import './popup.less';
import '../../assets/iconfont/iconfont.css';
// import '../../plugs/audio/audio.js';
import '../../plugs/audio/audio.css';
import Alert from 'antd/lib/alert';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      keylist: [
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"COMMERCIAL_INSURANCE",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"CONSUME_CAR",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"CONSUME_HOUSE",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"CUSTOMER_ADMIRE",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"CUSTOMER_AGE",
        },

        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"CUSTOMER_CHILD",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"CUSTOMER_HOBBY",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"CUSTOMER_JOB",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"CUSTOMER_MERRIGE",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"CUSTOMER_SEX",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"INSURANCE_PURCHASER",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"INVESTMENT_DURATION",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"INVESTMENT_PURCHASER",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"INVESTMENT_RATIO",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"INVESTMENT_TYPE",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"RISK_PREFERENCE",
        },
        {
          context:"没有",
          creat_time:"2018-08-10 11:01:52.0",
          kehuName:"王爱琪",
          phonenum:"13683229972",
          status:"false",
          taskid:"3",
          type:"SOCIAL_SECURITY",
        },
      ],
      hoverIndex: -1,
      isPlay: false,
      isOriginal: false,
      isInputEdit: true,
      isBiaozhu: false,
      biaozhuIndex: -1,
      isPaused:false,
      totalTime:0,
      playPer:0,
      bufferedPer:0,
      playedLeft:0,
      volumnLeft:0,
      remainTime:0,
      angle:0,
      mouseDown:false,
      musicListShow:false,
      currentMusic:{},
      isPlayed:false
    };
    this.clickChangeTime = this.clickChangeTime.bind(this);
    this.slideChangeTime = this.slideChangeTime.bind(this);
    this.slideChangeTime = this.slideChangeTime.bind(this);
  }
  componentDidMount() {
    // 获取taskId
    let taskId = this.props.location.query.taskId;
    let audio = this.refs.audio;
    //获取总时间
    audio.addEventListener('canplay',()=>{
      let totalTime = parseInt(this.refs.audio.duration);
      this.setState({
        totalTime:this.formatSeconds(totalTime),
      })
    })
    this.setState({
      remainTime:this.formatSeconds(0),
      playedLeft:this.refs.played.getBoundingClientRect().left,
    });
    // 请求已识别文件
    this.props.dispatch({
      type: 'popup/getFilesListByid',
      payload: {
        taskid: taskId
      },
      callback: (data) => {
        
      }
    })
    // 请求画像数据
    this.props.dispatch({
      type: 'popup/getFileResultApi',
      payload: {
        taskid: taskId
      },
      callback: (data) => {
        
      }
    })
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

  // 渲染画像数据
  renderTermWrap = () => {
    let {
      fileResult: {
        keylist,
        labellist,
      } = {}
    } = this.props.popup
    let taskId = this.props.location.query.taskId;
    return (
      <div className={['insightTermWrap', this.state.isOriginal ? 'insightTermWrapWidth' : ''].join(' ')} ref='insightTermWrap'>
        <Scrollbars>
          {
            Object.keys(this.state.customer).map((item, index) => (
              <div className="insightTerm" data-type={item} key={index} ref={'insightTerm' + item}>
                <div className="insightTermTitle">
                  <p>{this.state.customer[item]}:</p>
                  <div onClick={() => {
                    this.setState({
                      isInputEdit: false
                    })
                  }}>
                    {
                      keylist && keylist.length && keylist.map((keylistItem, keylistIndex) => {
                        if (keylistItem.type == item) {
                          return <input data-name={item} type="text" className="insightName" value={keylistItem.context} key={keylistIndex} disabled={this.state.isInputEdit} ref={'input' + index} onBlur={(e) => {
                            this.props.dispatch({
                              type: 'popup/KeyEdit',
                              payload: {
                                context: e.target.value,
                                taskId: taskId,
                                optype: 'add',
                                type: item,
                              },
                              callback: (data) => {
                                console.log(data)
                              },
                            })
                            this.setState({
                              isInputEdit: true,
                            })
                          }} onChange={(e) => {
                            const keylistObj = keylist
                            keylistObj.map((objItem, objIndex) => {
                              if (objItem.type == item) {
                                keylistObj[objIndex].context = e.target.value
                              }
                            })
                            this.props.dispatch({
                              type: 'popup/saveKeylistForm',
                              payload: {
                                fileResult: {
                                  ...this.props.popup.fileResult,
                                  keylist: keylistObj
                                }
                              },
                            })
                          }}></input>
                        }
                      })
                    }
                  </div>
                  <span className="insightTermNamedit pull-right" data-type={item} onClick={() => {
                    this.setState({
                      isInputEdit: false
                    }, () => {
                      let input = this.refs['input' + index];
                      input.focus();
                    })
                  }}>
                    <i className="iconfont icon-xiugai"></i>
                    <i className="iconfont icon-gou1"></i>
                  </span>
                </div>
                <div className="insightTermContent">
                  <div className="digTitle">挖掘出的语句</div>
                  {
                    keylist && labellist[item].map((labelItem, labelIndex) => (
                      <div className="digSentenceWrap" data-time={parseInt(labelItem.time / 1000)} data-boolean={labelItem.status} key={labelIndex}>
                        <div className="digSentence">
                          <p className={labelItem.status == 'true' ? '' : 'line-through'}>{this.formatSeconds(parseInt(labelItem.time / 1000))}</p>
                          <p className={['content', labelItem.status == 'true' ? '' : 'line-through'].join(" ")}>
                            {labelItem.context}
                            <i className="audioJump iconfont icon-yuyin1-copy" onClick={() => {
                              this.playMusic(labelItem.time)
                            }}></i>
                          </p>
                          <div className="arrow">
                            <i className="iconfont icon-sanjiaoright"></i>
                          </div>
                        </div>
                        <div className="border-wrap"></div>
                        <div className={labelItem.status == 'true' ? 'sentenceDel' : 'sentenceRight'} data-name={0} onClick={() => {
                          this.props.dispatch({
                            type: 'popup/editItem',
                            payload: {
                              id: labelItem.id,
                              status: labelItem.status == 'true' ? false: true,
                            },
                            callback: (data) => {
                              this.props.dispatch({
                                type: 'popup/getFileResultApi',
                                payload: {
                                  taskid: taskId
                                },
                              })
                              if (this.state.isOriginal) {
                                this.props.dispatch({
                                  type: 'popup/getOriginalList',
                                  payload: {
                                    taskid: taskId
                                  },
                                })
                              }
                            },
                          })
                        }}>
                          {
                             <i className={['iconfont', labelItem.status == 'true' ? 'icon-cuowu' : 'icon-gou1'].join(' ')}></i>
                          }
                        </div>
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

  // 渲染销售与用户对话
  renderTextWrap = () => {
    let {
      originalList
    } = this.props.popup
    // 获取taskId
    let taskId = this.props.location.query.taskId;
    return (
      <div className="insightTextWrap" style={{ boxSizing: 'border-box', }}>
        <Scrollbars>
          {
            Object.keys(originalList).map((item, index) => (
              <div key={index} className={['originalText', originalList[item].role == 'USER' ? 'rightText' : 'leftText'].join(' ')}>
                {
                  originalList[item].role == 'USER' ?
                  <div className="fristLine">
                    <span>用户</span>
                    <span>{this.formatSeconds(parseInt(originalList[item].startTime / 1000))}</span>
                  </div> :
                  <div className="fristLine">
                    <span>{this.formatSeconds(parseInt(originalList[item].startTime / 1000))}</span>
                    <span>销售</span>
                  </div>
                }

                <div className="secondLine">
                  <span className="context">{originalList[item].voiceContent}</span>
                  <span className="laba" onClick={() => {
                    this.playMusic(originalList[item].startTime)
                  }}>
                    <i className="iconfont icon-yuyin1-copy"></i>
                  </span>
                  <span className="originalTextBiaozhu" onClick={() => {
                    this.setState({
                      biaozhuIndex: index,
                    })
                  }}>
                    <i className="iconfont icon-tab2biaozhu"></i>
                  </span>
                  {
                    index == this.state.biaozhuIndex &&
                    <ul className="biaozhuLi">
                      <p>
                        标注该句属于下
                        <br />列哪个洞察项：
                      </p>
                      {
                        Object.keys(this.state.customer).map((customerItem, customerIndex) => (
                          <li onClick={() => {
                            this.props.dispatch({
                              type: 'popup/editItemLeft',
                              payload: {
                                taskid: taskId,
                                type: customerItem,
                                operaType: 'add',
                                startLine: originalList[item].id + '',
                                endLine: originalList[item].id + '',
                                context: originalList[item].voiceContent
                              },
                              callback: (data) => {
                                this.setState({
                                  biaozhuIndex: -1,
                                })
                                this.props.dispatch({
                                  type: 'popup/getFileResultApi',
                                  payload: {
                                    taskid: taskId
                                  },
                                  callback: () => {
                                    let scrollH = this.refs['insightTerm' + customerItem].offsetTop-180;
                                    this.refs.insightTermWrap.scrollTop = scrollH + 'px'
                                    // this.refs.insightTermWrap.animate({scrollTop: scrollH+'px'}, 500);
                                  }
                                })
                                this.props.dispatch({
                                  type: 'popup/getOriginalList',
                                  payload: {
                                    taskid: taskId
                                  },
                                })
                              }
                            })
                          }} key={customerIndex}>{this.state.customer[customerItem]}</li>
                        ))
                      }
                    </ul>
                  }
                </div>
                <div className="ThirdLine" data-type-arr="">
                  {
                    originalList[item].types.length > 0 && originalList[item].types.map((typeItem, itemIndex) => (
                      <span className="tags" key={itemIndex}>
                        {this.state.customer[originalList[item].types[itemIndex]]}
                        <i className="iconfont icon-shanchu1"></i>
                      </span>
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

  // 音频进度条点击事件
  clickChangeTime (e) {
    if(!e.pageX){
      return
    }
    this.setTimeOnPc(e)
  }

  // 改变音频播放时间与进度条
  setTimeOnPc = (e) => {
    let audio = this.refs.audio;
    let newWidth = (e.pageX - this.state.playedLeft) / this.refs.progress.offsetWidth;
    this.refs.played.style.width = newWidth * 100 + "%";
    audio.currentTime = newWidth * audio.duration;
    this.setState({
      remainTime: this.formatSeconds(parseInt(newWidth * audio.duration / 1000))
    })
    this.refs.circle.style.left = newWidth * 100 + "%";
  }

  // 音频播放事件
  play = () => {
    let audio = this.refs.audio;
    if (audio.paused) {
      audio.play()
      this.setState({
        isPlay: true,
      })
    } else {
      audio.pause()
      this.setState({
        isPlay: false
      })
    }

    audio.addEventListener('timeupdate',()=>{
      //设置播放进度条
      let playPer = audio.currentTime/audio.duration;
      this.refs.played.style.width = playPer*100+"%";
      this.refs.circle.style.left = playPer*100+"%";

      this.setState({
        remainTime:this.formatSeconds(parseInt(audio.currentTime)),
      });
    });
  }

  // 音频拖拽事件
  mouseDown = () => {
    this.setState({
      mouseDown:true
    });
  }
  slideChangeTime(e){
    if(this.state.mouseDown){
      this.setTimeOnPc(e)
    }
  }
  mouseUp = () => {
    this.setState({
      mouseDown:false
    });
  }
  mouseLeave = () => {
    this.setState({
      mouseDown:false
    });
  }

  // 点击某一条录音播放
  playMusic = (startTime) => {
    let audio = this.refs.audio;
    audio.currentTime = parseInt(startTime / 1000);
    this.setState({
      remainTime:this.formatSeconds(parseInt(startTime / 1000)),
    });
    let playPer = audio.currentTime/audio.duration;
    this.refs.played.style.width = playPer*100+"%";
    this.refs.circle.style.left = playPer*100+"%";
  }

  // 渲染音频播放器
  renderAudio = () => {
    return (
      <div className="archivesAudio">
        <div id="audioEle">
          <div className="wx-audio-content" style={{ width: '100%' }}>
            <audio className="wx-audio-content" src={require('../../assets/Universe.mp3')} ref='audio'></audio>
            <div className="wx-audio-right">
              <p className="middleX"></p>
              <div className="wx-audio-time">
                <span className="current-t">{this.props.popup.fileResult.filePath ? this.state.remainTime : '00:00:00'}</span>
                <span className="duration-t">{this.props.popup.fileResult.filePath ? this.state.totalTime : '00:00:00'}</span>
              </div>
              <div className="wx-audio-progrees" ref='progress' onClick={this.clickChangeTime} onMouseDown={() => {
                this.mouseDown()
              }} onMouseMove={this.slideChangeTime} onMouseUp={this.mouseUp} onMouseLeave={this.mouseLeave}>
                <div className="wx-progrees-detail">
                  <span className="wx-voice-p" ref='played'></span>
                  <span className="wx-buffer-p"></span>
                  <span className="wx-loading">
                    <span className="wx-loading-wrapper"></span>
                  </span>
                </div>
                <div className="wx-audio-origin" ref='circle'></div>
              </div>
            </div>
            <div className="wx-audio-left">
              <i className={['iconfont', this.state.isPlay ? "icon-zanting" : "icon-bofang"].join(' ')} onClick={() => {
                this.play()
              }}></i>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let {
      filesList
    } = this.props.popup
    let taskId = this.props.location.query.taskId;
    return (
      <div id="popup" className="bootContent">
        {/* 头部信息 */}
        <CommonHeader title="洞察结果" goback home isUserPort photograph />
        {/* <div className="tab">
          <span className="tabData iconfont icon-xiangqing1"><span>数据</span></span>
          <span className="tabPortrait iconfont icon-huaxiang" onClick={() => { this.props.dispatch(routerRedux.push('/userPortrait')); }}><span>画像</span></span>
        </div> */}
        <DanaoWrapper>
          <div id="archivesModal" className={this.state.isOriginal ? "archivesBigModal" : ""}>
            <div className="originalTextOperate">
              {/* 点击原文或收起 */}
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
                  this.props.dispatch({
                    type: 'popup/getOriginalList',
                    payload: {
                      taskid: taskId
                    },
                    callback: (data) => {
                      this.setState({
                        isOriginal: true,
                      })
                    }
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
              <div className="modal-box">
                {
                  this.state.isOriginal && this.renderTextWrap()
                }
                {
                  this.renderTermWrap()
                }
              </div>
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
                共计 <span className="total-number">{filesList.length}</span> 个文件
              </div>
            </div>
            <Scrollbars>
              <ul id="file-list">
                {
                  filesList.map((item, index) => (
                    <li className={['file-item', item.id == taskId ? 'item-active-2' : '', index == this.state.hoverIndex ? 'item-active' : ''].join(' ')} data-name={item.id} data-status={item.statusMessage} key={index}
                      onClick={() => {
                        this.props.dispatch({
                          type: 'history/saveTaskId',
                          payload: {
                            taskId: item.id,
                          },
                          callback: () => {
                            this.props.dispatch({
                              type: 'popup/getFileResultApi',
                              payload: {
                                taskid: item.id
                              },
                              callback: (data) => {
                                
                              }
                            })
                          }
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
export default connect(({ popup, history }) => ({ popup, history }))(Popup);
