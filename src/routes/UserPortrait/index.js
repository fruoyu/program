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
      pageNum: 0,
      filesList: [],
    };
    this.getQueryKeyItem = this.getQueryKeyItem.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderArt = this.renderArt.bind(this);
    this.scrollFn = this.scrollFn.bind(this);
  }
  componentDidMount() {
    this.sendRequest();
    this.getQueryKeyItem(this.props.location.query.taskId);
  }
  // 根据id获取画像信息
  getQueryKeyItem(id) {
    this.props.dispatch({
      type: 'history/getQueryKeyItem',
      payload: {
        taskid: id,
      },
      callback: () => {
        // console.log(this.props.history.keyItemData);
        setTimeout(() => {
          $('.dashed').slideDown('slow');
        }, 1000);
      },
    });
  }
  // 获取列表信息
  sendRequest = () => {
    this.props.dispatch({
      type: 'history/getFilesList',
      payload: {
        endTime: '',
        fileName: '',
        name: '',
        pageNum: this.state.pageNum,
        pageSize: 10,
        startTime: '',
        status: '',
      },
      callback: (data) => {
        const newFilesList = [...this.state.filesList, ...data.reslist]
        this.setState({
          filesList: this.state.pageNum === 0 ? data.reslist : newFilesList,
        });
      },
    });
  }
  // 下拉刷新
  scrollFn = (data) => {
    if (data.top === 0 && this.state.filesList.length !== 10) { // 返回到第一页信息
      this.setState({
        pageNum: 0,
      }, () => {
        this.sendRequest();
      });
    } else if (data.top === 1) {
      this.setState({
        pageNum: this.state.pageNum + 1,
      });
      setTimeout(() => {
        this.sendRequest();
      }, 1000);
    }
  }
  // 滑过提示信息
  renderArt =(content) => {
    if (content) {
      return (<small className="has-content">{content}</small>);
    } else {
      return (<small className="not-has-content">无</small>);
    }
  }
  // 具体信息展示函数
  renderContext = (index) => {
    const { keyItemData } = this.props.history;
    let result = '无';
    if (keyItemData && keyItemData.length > 0 && keyItemData[index] &&
      keyItemData[index].context.length > 0) {
      result = keyItemData[index].context;
    }
    return result;
  }
  render() {
    const { filesList } = this.state;
    const taskId = this.props.location.query.taskId;
    return (
      <div className="bootContent userPortrait">
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部 */}
          <CommonHeader title="用户画像" goback record photograph home taskId={this.props.location.query.taskId} />
          {/* 画像 */}
          <div id="main">
            <div className="userPortrait">
              <div className="title">
                用户画像
              </div>
              <div className="saomiao">
                <div className="guangbiao" />
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
                        onMouseEnter={() => { this.setState({ key: 0 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span className="item">子女 :</span>
                        <span className="CUSTOMER_CHILD">
                          {
                            this.renderContext(0)
                          }
                        </span>
                        {
                          this.state.key === 0 && this.renderArt(this.renderContext(0))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 1 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>年龄 :</span>
                        <span className="CUSTOMER_AGE">
                          {
                            this.renderContext(1)
                          }
                        </span>
                        {
                          this.state.key === 1 && this.renderArt(this.renderContext(1))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 2 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>性别 :</span>
                        <span className="CUSTOMER_SEX">
                          {
                            this.renderContext(2)
                          }
                        </span>
                        {
                          this.state.key === 2 && this.renderArt(this.renderContext(2))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 3 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>婚姻 :</span>
                        <span className="CUSTOMER_MERRIGE">
                          {
                            this.renderContext(3)
                          }
                        </span>
                        {
                          this.state.key === 3 && this.renderArt(this.renderContext(3))
                        }
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
                      <li
                        onMouseEnter={() => { this.setState({ key: 4 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>从事行业 :</span>
                        <span className="CUSTOMER_JOB">
                          {
                           this.renderContext(4)
                         }
                        </span>
                        {
                          this.state.key === 4 && this.renderArt(this.renderContext(4))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 5 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>房产情况 :</span>
                        <span className="CONSUME_HOUSE">
                          {
                            this.renderContext(5)
                          }
                        </span>
                        {
                          this.state.key === 5 && this.renderArt(this.renderContext(5))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 6 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>车辆情况 :</span>
                        <span className="CONSUME_CAR">
                          {
                           this.renderContext(6)
                         }
                        </span>
                        {
                          this.state.key === 6 && this.renderArt(this.renderContext(6))
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="dashed xingquaihao leftdashed">
                <div className="yuan" />
                <div className="xiexian" />
                <div className="content">
                  <div className="img">
                    <img src={require('../../assets/image/icon_05.png')} />
                  </div>
                  <div className="ul">
                    <h3>兴趣爱好</h3>
                    <ul>
                      <li
                        onMouseEnter={() => { this.setState({ key: 7 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>爱好的活动 :</span>
                        <span className="CUSTOMER_HOBBY">
                          {
                           this.renderContext(7)
                         }
                        </span>
                        {
                          this.state.key === 7 && this.renderArt(this.renderContext(7))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 8 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>欣赏什么样的人 :</span><span className="CUSTOMER_ADMIRE">
                        {
                           this.renderContext(8)
                         }
                      </span>
                        {
                          this.state.key === 8 && this.renderArt(this.renderContext(8))
                        }
                      </li>
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
                      <li
                        onMouseEnter={() => { this.setState({ key: 9 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>社保 :</span>
                        <span className="has-cont">
                          {
                           this.renderContext(9)
                         }
                        </span>
                        {
                          this.state.key === 9 && this.renderArt(this.renderContext(9))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 10 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>商保 :</span>
                        <span className="COMMERCIAL_INSURANCE">
                          {
                           this.renderContext(10)
                         }
                        </span>
                        {
                            this.state.key === 10 && this.renderArt(this.renderContext(10))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 11 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>保险购买人 :</span>
                        <span className="INSURANCE_PURCHASER">
                          {
                           this.renderContext(11)
                         }
                        </span>
                        {
                          this.state.key === 11 && this.renderArt(this.renderContext(11))
                        }
                      </li>
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
                      <li
                        onMouseEnter={() => { this.setState({ key: 12 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>投资类型 :</span>
                        <span className="INVESTMENT_TYPE">
                          {
                           this.renderContext(12)
                         }
                        </span>
                        {
                          this.state.key === 12 && this.renderArt(this.renderContext(12))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 13 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>投资打理人 :</span>
                        <span className="INVESTMENT_PURCHASER">
                          {
                           this.renderContext(13)
                         }
                        </span>
                        {
                          this.state.key === 13 && this.renderArt(this.renderContext(13))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 14 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>各项投资占比 :</span>
                        <span className="INVESTMENT_RATIO">
                          {
                           this.renderContext(14)
                         }
                        </span>
                        {
                          this.state.key === 14 && this.renderArt(this.renderContext(14))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 15 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>投资时长 :</span>
                        <span className="INVESTMENT_DURATION">
                          {
                           this.renderContext(15)
                         }
                        </span>
                        {
                          this.state.key === 15 && this.renderArt(this.renderContext(15))
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 16 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>理财风险偏好 :</span>
                        <span className="RISK_PREFERENCE">
                          {
                           this.renderContext(16)
                         }
                        </span>
                        {
                          this.state.key === 16 && this.renderArt(this.renderContext(16))
                        }
                      </li>
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
                共计 <span className="total-number">{filesList.length}</span> 个文件
              </div>
            </div>
            <Scrollbars onScrollFrame={(data) => { this.scrollFn(data); }}>
              <ul id="file-list">
                {
                  filesList.length > 0 && filesList.map((item, index) => (
                    <li
                      className={['file-item', item.id == taskId ? 'item-active-2' : '', index == this.state.hoverIndex ? 'item-active' : ''].join(' ')}
                      data-name={item.id}
                      data-status={item.statusMessage}
                      key={index}
                      onClick={() => {
                        this.setState({
                          clickIndex: index,
                        }, () => {
                          this.props.dispatch(routerRedux.push({
                            pathname: '/userPortrait',
                            query: {
                              taskId: item.id,
                            },
                          }));
                          this.getQueryKeyItem(item.id);
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

export default connect(({ history }) => ({ history }))(UserPortrait);
