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
      uploadDialog: false,
    };
  }
  componentDidMount() {
    if (this.props.location.pathname === '/') {
      this.props.dispatch(routerRedux.push('/login'));
    }
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
            })
          }}></div>
        {/*上传文件*/}
        {
          this.state.uploadDialog &&
          <div id="upload-voice">
            <div className="upload-top">
              <div className="title">上传语音文件</div>
              <span className="close iconfont icon-htmal5icon19" onClick={() => {
                this.setState({
                  uploadDialog: false,
                })
              }}></span>
            console.log('启动洞察');
          }}
        />
        {/* 上传文件 */}
        <div id="upload-voice">
          <div className="upload-top">
            <div className="title">上传语音文件</div>
            <span className="close iconfont icon-htmal5icon19"></span>
          </div>
          <div className="upload-middle">
            <div className="upload-btn">
              {/* <accept="audio/wav, audio/mp3"> */}
              <input id="upload" type="file" name="file" multiple="multiple" accept="audio/wav, audio/mp3" hidden />
              <span className="iconfont icon-shangchuan"></span>
              <p style={{ marginBottom: '10px' }}>上传文件</p>
              <p>支持扩展名 .wav .mp3</p>
            </div>
            <div className="upload-middle">
              <div className="upload-btn">
                {/*<accept="audio/wav, audio/mp3">*/}
                <input id="upload" type="file" name="file" multiple="multiple" accept="audio/wav, audio/mp3" hidden />
                <span className="iconfont icon-shangchuan"></span>
                <p style={{marginBottom: '10px'}}>上传文件</p>
                <p>支持扩展名 .wav .mp3</p>
              </div>
              <div className="upload-num">
                <span className="total">共<span className="total-num">0</span>个文件</span>
                <span className="already">已完成<span className="uploaded-number">0</span>个</span>
              </div>
            </div>
            <div className="upload-bottom">
              <span className="upload-failed">*上传文件中断，请刷新重新上传</span>
            </div>
          </div>
        }
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
        {/* 提示有未上传成功的文件 */}
        <div className="successWrap">
          <div className="success">
            <span className="iconfont icon-htmal5icon19"></span>
            <div className="img">
              <img src={require('../../assets/image/yun.png')} alt="" />
            </div>
            <div className="successTop">
              您已成功上传<span className="successNum" />个文件，现在可以去往历史任务页面查看分析结果。
            </div>
            <div className="unSuccessTop">
              您有文件未上传成功，是否终止上传
            </div>
            <div className="bottom b_success">
              <div className="guanbi">关闭</div>
              <div className="toHistory">历史任务</div>
            </div>
            <div className="bottom b_unsuccess">
              <div className="go-anyway">去意已决</div>
              <div className="wait">我再等等</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({ home }) => ({ home }))(Main);
