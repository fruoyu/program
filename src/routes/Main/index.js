import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {
  DanaoWrapper,
  CommonHeader,
} from '../../components';
import './main.less';
import '../../assets/iconfont/iconfont.css';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      nameArr: ['子女信息','年龄','性别','婚姻状况', '从事行业','房产情况','车辆情况','社保','商保',
        '保险购买人','投资类型', '投资打理人','投资占比','投资时长','理财偏好','爱好活动','欣赏什么样的人'],
      uploadDialog: true,
      gotoOtherPage: false,
      fileSuccess: true,
      uploadSure: true,
    };
  }

  changeUploadFile = (e) => {
    if (true) {
      alert('格式不正确');
      return false;
    }
  }

  // 渲染上传文件弹框
  renderUpload = () => {
    return (
      <div id="upload-voice" className={this.state.uploadSure ? 'big' : ''}>
        <div className="upload-top">
          <div className="title">上传语音文件</div>
          <span
            className="close iconfont icon-htmal5icon19" onClick={() => {
              // this.setState({
              //   uploadDialog: false,
              // });
              console.log(this.refs.uploadInput)
            }}
          />
        </div>
        <div className="upload-middle">
          <div className="upload-btn">
            {/* <accept="audio/wav, audio/mp3">*/}
            <input id="upload" type="file" name="file" multiple="multiple" accept="audio/wav, audio/mp3" ref='uploadInput' hidden onChange={(e) => {
              this.changeUploadFile(e)
            }} />
            <span className="iconfont icon-shangchuan" />
            <p style={{ marginBottom: '10px' }}>上传文件</p>
            <p>支持扩展名 .wav .mp3</p >
          </div>
          <div className="upload-num">
            <span className="total">共<span className="total-num">0</span>个文件</span>
            <span className="already">已完成<span className="uploaded-number">0</span>个</span>
          </div>
        </div>
        {
          this.state.uploadSure &&
          <div className="upload-bottom">
            <span className="upload-failed">*上传文件中断，请刷新重新上传</span>
            <div className="list-wrap">
              <div className="upload-item">
                <div className="file-info" style={{ color: true ? '#fff' : '#f00' }}>名字</div>
                <div className="file-progress">
                  <div className="progress-color"></div>
                  <div className="progress-grey">
                    <span className="percent">0%</span>
                  </div>
                </div>
                <div className="is-complete">
                  <span className="iconfont icon-gou1"></span>
                  <span className="iconfont icon-shuaxin"></span>
                </div>
              </div>
            </div>
          </div>
        }
        
      </div>
    );
  }

  // 渲染上传文件成功后弹框
  renderFile = () => {
    return (
      <div className="successWrap">
        <div className="success">
          <span className="iconfont icon-htmal5icon19" onClick={() => {
            this.setState({
              gotoOtherPage: false,
            })
          }}></span>
          <div className="img">
            <img src={require('../../assets/image/yun.png')} alt=""></img>
          </div>
          {
            this.state.fileSuccess ? <div className="successTop">
              您已成功上传<span className="successNum"></span>个文件，现在可以去往历史任务页面查看分析结果。
            </div> : <div className="unSuccessTop">
              您有文件未上传成功，是否终止上传
            </div>
          }
          {
            <div className={['bottom', this.state.fileSuccess ? 'b_success' : 'b_unsuccess'].join(' ')}>
              <div className={this.state.fileSuccess ? 'guanbi' : 'go-anyway'} onClick={() => {
                this.setState({
                  gotoOtherPage: false,
                })
              }}>{this.state.fileSuccess ? '关闭' : '去意已决'}</div>
              <div className={this.state.fileSuccess ? 'toHistory' : 'wait'} onClick={() => {
                if (this.state.fileSuccess) {
                  this.props.dispatch(routerRedux.push({
                    pathname: '/history',
                  }));
                } else {
                  this.setState({
                    gotoOtherPage: false,
                  })
                }
              }}>{this.state.fileSuccess ? '历史任务' : '我再等等'}</div>
            </div>
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="mainShouye">
        {/* 头部信息 */}
        <CommonHeader isMain isUserPort home />
        <div id="info">告诉MOXI你想要挖掘的信息</div>
        {/* 启动洞察 */}
        <div
          id="start-insight"
          onClick={() => {
            console.log('上传文件', this)
            this.setState({
              uploadDialog: true,
            });
          }}
        />
        <DanaoWrapper>
          <div className="circleWrap">
            {
              this.state.nameArr.map((item, index) => (
                <div className="circle" data-number={index} key={index}>
                  <span>{item}</span>
                </div>
              ))
            }
          </div>
        </DanaoWrapper>
        {/* 上传文件*/}
        {
          this.state.uploadDialog && this.renderUpload()
        }
        {
          this.state.gotoOtherPage && this.renderFile()
        }
      </div>
    );
  }
}
export default connect(({ home }) => ({ home }))(Main);

