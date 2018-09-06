import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';
import './userPortrait.less';
import {
  CommonHeader,
} from '../../components';
import {ifToken, verify} from '../../utils/cookie';


class UserPortrait extends Component {
  constructor() {
    super();
    this.state = {
      clickIndex: 0,
      pageNum: 1,
      filesList: [],
    };
    this.getQueryKeyItem = this.getQueryKeyItem.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderArt = this.renderArt.bind(this);
    this.scrollFn = this.scrollFn.bind(this);
    this.renderContext = this.renderContext.bind(this);
  }
  componentWillMount() {
    // this.sendRequest();
    this.getQueryKeyItem(this.props.location.query.customerId);
  }
  // 根据id获取画像信息
  getQueryKeyItem(id) {
    this.props.dispatch({
      type: 'history/getQueryKeyItem',
      payload: {
        customerId: id,
      },
    });
    setTimeout(() => {
      $('.dashed').slideDown('slow');
    }, 1000);
  }
  // 获取列表信息
  sendRequest = () => {
    verify((err, decoded) => {
      if (err) return;
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
          userName: decoded.data.userName,
          groupId: decoded.data.groupId,
        },
        callback: (data) => {
          const newFilesList = [...this.state.filesList, ...data.reslist];
          this.setState({
            filesList: this.state.pageNum === 0 ? data.reslist : newFilesList,
          });
        },
      });
    });
  };
  // 下拉刷新
  scrollFn = (data) => {
    if (data.top === 0 && this.state.filesList.length !== 10) { // 返回到第一页信息
      this.setState({
        pageNum: 1,
      }, () => {
        ifToken(() => {
          this.sendRequest();
        });
      });
    } else if (data.top === 1) {
      this.setState({
        pageNum: this.state.pageNum + 1,
      });
      setTimeout(() => {
        ifToken(() => {
          this.sendRequest();
        });
      }, 1000);
    }
  }
  // 滑过提示信息
  renderArt =(content) => {
    if (content.length !== 0) {
      return (<small className="has-content">{content}</small>);
    } else {
      return (<small className="not-has-content">无</small>);
    }
  }
  // 具体信息展示函数
  renderContext = (value) => {
    let result = '无';
    if (value && value.length > 0) {
      result = value;
    }
    return result;
  }
  render() {
    // const { filesList } = this.state;
    // const taskId = this.props.location.query.taskId;
    const { keyItemData } = this.props.history;
    return (
      <div className="bootContent userPortrait">
        <Scrollbars style={{ flex: 1 }} autoHide>
          {/* 头部 */}
          <CommonHeader title="用户画像" isMain customer photograph />
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
                    <img alt="" src={require('../../assets/image/icon_03.png')} style={{ width: '100%"' }} />
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
                            keyItemData && this.renderContext(keyItemData.CUSTOMER_CHILD)
                          }
                        </span>
                        {
                          this.state.key === 0 && this.renderArt(keyItemData.CUSTOMER_CHILD)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 1 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>年龄 :</span>
                        <span className="CUSTOMER_AGE">
                          {
                            keyItemData && this.renderContext(keyItemData.CUSTOMER_AGE)
                          }
                        </span>
                        {
                          this.state.key === 1 && this.renderArt(keyItemData.CUSTOMER_AGE)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 2 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>性别 :</span>
                        <span className="CUSTOMER_SEX">
                          {
                            keyItemData && this.renderContext(keyItemData.CUSTOMER_SEX)
                          }
                        </span>
                        {
                          this.state.key === 2 && this.renderArt(keyItemData.CUSTOMER_SEX)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 3 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>婚姻 :</span>
                        <span className="CUSTOMER_MERRIGE">
                          {
                            keyItemData && this.renderContext(keyItemData.CUSTOMER_MERRIGE)
                          }
                        </span>
                        {
                          this.state.key === 3 && this.renderArt(keyItemData.CUSTOMER_MERRIGE)
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
                    <img alt="" src={require('../../assets/image/icon_12.png')} style={{ width: '100%"' }} />
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
                            keyItemData && this.renderContext(keyItemData.CUSTOMER_JOB)
                         }
                        </span>
                        {
                          this.state.key === 4 && this.renderArt(keyItemData.CUSTOMER_JOB)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 5 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>房产情况 :</span>
                        <span className="CONSUME_HOUSE">
                          {
                            keyItemData && this.renderContext(keyItemData.CONSUME_HOUSE)
                          }
                        </span>
                        {
                          this.state.key === 5 && this.renderArt(keyItemData.CONSUME_HOUSE)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 6 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>车辆情况 :</span>
                        <span className="CONSUME_CAR">
                          {
                            keyItemData && this.renderContext(keyItemData.CONSUME_CAR)
                         }
                        </span>
                        {
                          this.state.key === 6 && this.renderArt(keyItemData.CONSUME_CAR)
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
                    <img alt="" src={require('../../assets/image/icon_05.png')} />
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
                            keyItemData && this.renderContext(keyItemData.CUSTOMER_HOBBY)
                         }
                        </span>
                        {
                          this.state.key === 7 && this.renderArt(keyItemData.CUSTOMER_HOBBY)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 8 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>欣赏什么样的人 :</span><span className="CUSTOMER_ADMIRE">
                          {
                            keyItemData && this.renderContext(keyItemData.CUSTOMER_ADMIRE)
                          }
                        </span>
                        {
                          this.state.key === 8 && this.renderArt(keyItemData.CUSTOMER_ADMIRE)
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
                    <img alt="" src={require('../../assets/image/icon_14.png')} style={{ width: '100%"' }} />
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
                            keyItemData && this.renderContext(keyItemData.SOCIAL_SECURITY)
                         }
                        </span>
                        {
                          this.state.key === 9 && this.renderArt(keyItemData.SOCIAL_SECURITY)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 10 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>商保 :</span>
                        <span className="COMMERCIAL_INSURANCE">
                          {
                            keyItemData && this.renderContext(keyItemData.COMMERCIAL_INSURANCE)
                         }
                        </span>
                        {
                          this.state.key === 10 && this.renderArt(keyItemData.COMMERCIAL_INSURANCE)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 11 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>保险购买人 :</span>
                        <span className="INSURANCE_PURCHASER">
                          {
                            keyItemData && this.renderContext(keyItemData.INSURANCE_PURCHASER)
                         }
                        </span>
                        {
                          this.state.key === 11 && this.renderArt(keyItemData.INSURANCE_PURCHASER)
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
                    <img alt="" src={require('../../assets/image/icon_07.png')} style={{ width: '100%"' }} />
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
                            keyItemData && this.renderContext(keyItemData.INVESTMENT_TYPE)
                         }
                        </span>
                        {
                          this.state.key === 12 && this.renderArt(keyItemData.INVESTMENT_TYPE)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 13 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>投资打理人 :</span>
                        <span className="INVESTMENT_PURCHASER">
                          {
                            keyItemData && this.renderContext(keyItemData.INVESTMENT_PURCHASER)
                         }
                        </span>
                        {
                          this.state.key === 13 && this.renderArt(keyItemData.INVESTMENT_PURCHASER)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 14 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>各项投资占比 :</span>
                        <span className="INVESTMENT_RATIO">
                          {
                            keyItemData && this.renderContext(keyItemData.INVESTMENT_RATIO)
                         }
                        </span>
                        {
                          this.state.key === 14 && this.renderArt(keyItemData.INVESTMENT_RATIO)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 15 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>投资时长 :</span>
                        <span className="INVESTMENT_DURATION">
                          {
                            keyItemData && this.renderContext(keyItemData.INVESTMENT_DURATION)
                         }
                        </span>
                        {
                          this.state.key === 15 && this.renderArt(keyItemData.INVESTMENT_DURATION)
                        }
                      </li>
                      <li
                        onMouseEnter={() => { this.setState({ key: 16 }); }}
                        onMouseLeave={() => { this.setState({ key: -1 }); }}
                      >
                        <span>理财风险偏好 :</span>
                        <span className="RISK_PREFERENCE">
                          {
                            keyItemData && this.renderContext(keyItemData.RISK_PREFERENCE)
                         }
                        </span>
                        {
                          this.state.key === 16 && this.renderArt(keyItemData.RISK_PREFERENCE)
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<div id="recognized-file">
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
            <ul id="file-list">
              <Scrollbars onScrollFrame={(data) => { this.scrollFn(data); }}>
                {
                  filesList.length > 0 && filesList.map((item, index) => (
                    <li
                      className={['file-item', item.id * 1 === taskId * 1 ? 'item-active-2' : '', index * 1 === this.state.hoverIndex * 1 ? 'item-active' : ''].join(' ')}
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
              </Scrollbars>
            </ul>
          </div>*/}
        </Scrollbars>
      </div>
    );
  }
}

export default connect(({ history }) => ({ history }))(UserPortrait);
