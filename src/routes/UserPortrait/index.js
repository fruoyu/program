import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';
import './userPortrait.less';
import {
  CommonHeader,
} from '../../components';


class UserPortrait extends Component {
  constructor() {
    super();
    this.state = {
      clickIndex: 0,
      fileList: [
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 24,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 24,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 24,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 24,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 24,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 24,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 24,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 24,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 24,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 22,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 24,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
        {
          createTime: '2018-08-14 14:15:28.0',
          dialogueContent: '',
          fileName: '战旗-王帅-录音笔-123456.WAV',
          filePath: '/home/work/guoshou/classes/static/data/20180814141528005战旗-王帅-录音笔-123456.WAV',
          id: 28,
          insightResult: '',
          lastUpdateTime: '2018-08-14 14:15:28.0',
          md5: '',
          size: '9.5MB',
          statusMessage: 'done',
          systemId: 0,
          taskid: '',
          userId: '11024400000050',
          userName: '周晨',
        },
      ],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      $('.dashed').slideDown('slow');
    }, 1000);
  }

  render() {
    return (
      <div className="bootContent userPortrait">
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部 */}
          <CommonHeader title="用户画像" goback home isUserPort isMain path={this.props.route.path} />
          {/* 画像 */}
          <div id="main">
            <div className="userPortrait">
              <div className="title">
                用户画像
              </div>
              <div className="saomiao">
                <div className="guangbiao"></div>
              </div>
              <div className="dashed jiating leftdashed">
                <div className="yuan" />
                <div className="xiexian" />
                <div className="content">
                  <div className="img">
                    <img src={require('../../assets/image/icon_03.png')} style={{ width: '100%"' }} />
                  </div>
                  <div className="ul">
                    <h3>家庭结构</h3>
                    <ul>
                      <li
                        onMouseEnter={() => { this.setState({ key: 1 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span className="item">子女 :</span>
                        <span className="CUSTOMER_CHILD">数据</span>
                        {
                          this.state.key === 1 && <small style={{ background: '#ffc', padding: 5 }}>小程是sd的女生序</small>
                        }

                      </li>
                      <li>
                        <span>年龄 :</span>
                        <span className="CUSTOMER_AGE">18</span>
                      </li>
                      <li>
                        <span>性别 :</span>
                        <span className="CUSTOMER_SEX">无</span>
                      </li>
                      <li>
                        <span>婚姻 :</span>
                        <span className="CUSTOMER_MERRIGE">无</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="dashed goumaili leftdashed">
                <div className="yuan" />
                <div className="xiexian" />
                <div className="content">
                  <div className="img">
                    <img src={require('../../assets/image/icon_12.png')} style={{ width: '100%"' }} />
                  </div>
                  <div className="ul">
                    <h3>购买力</h3>
                    <ul>
                      <li><span>从事行业 :</span><span className="CUSTOMER_JOB">无</span></li>
                      <li><span>房产情况 :</span><span className="CONSUME_HOUSE">无</span></li>
                      <li><span>车辆情况 :</span><span className="CONSUME_CAR">无</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="dashed xingquaihao leftdashed">
                <div className="yuan" />
                <div className="xiexian" />
                <div className="content">
                  <div className="img">
                    <img src={require('../../assets/image/icon_05.png')}  />
                  </div>
                  <div className="ul">
                    <h3>兴趣爱好</h3>
                    <ul>
                      <li><span>爱好的活动 :</span><span className="CUSTOMER_HOBBY">无</span></li>
                      <li><span>欣赏什么样的人 :</span><span className="CUSTOMER_ADMIRE">无</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="dashed baoxian rightdashed">
                <div className="yuan rightyuan" />
                <div className="xiexian leftxiexian" />
                <div className="content">
                  <div className="img" style={{ float: 'right' }}>
                    <img src={require('../../assets/image/icon_14.png')} style={{ width: '100%"' }} />
                  </div>
                  <div className="ul">
                    <h3>保险情况</h3>
                    <ul>
                      <li><span>社保 :</span><span className="SOCIAL_SECURITY">无</span></li>
                      <li><span>商保 :</span><span className="COMMERCIAL_INSURANCE">无</span></li>
                      <li><span>保险购买人 :</span><span className="INSURANCE_PURCHASER">无</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="dashed touzi rightdashed">
                <div className="yuan rightyuan" />
                <div className="xiexian leftxiexian" />
                <div className="content">
                  <div className="img" style={{ float: 'right' }}>
                    <img src={require('../../assets/image/icon_07.png')} style={{ width: '100%"' }} />
                  </div>
                  <div className="ul">
                    <h3>投资情况</h3>
                    <ul>
                      <li><span>投资类型 :</span><span className="INVESTMENT_TYPE">无</span></li>
                      <li><span>投资打理人 :</span><span className="INVESTMENT_PURCHASER">无</span></li>
                      <li><span>各项投资占比 :</span><span className="INVESTMENT_RATIO">无</span></li>
                      <li><span>投资时长 :</span><span className="INVESTMENT_DURATION">无</span></li>
                      <li><span>理财风险偏好 :</span><span className="RISK_PREFERENCE">无</span></li>
                    </ul>
                  </div>
                </div>
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
                共计 <span className="total-number">{this.state.fileList.length}</span> 个文件
              </div>
            </div>
            <Scrollbars>
              <ul id="file-list">
                {
                  this.state.fileList.map((item, index) => (
                    <li
                      className={['file-item', index === this.state.clickIndex ? 'item-active-2' : '', index === this.state.hoverIndex ? 'item-active' : ''].join(' ')} data-name={item.id} data-status={item.statusMessage} key={index}
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
                      }}
                    >
                      <span className="item-name">{item.fileName}</span>
                      <span className="item-size">{item.size}</span>
                    </li>
                  ))
                }
              </ul>
            </Scrollbars>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default connect(({ login }) => ({ login }))(UserPortrait);
