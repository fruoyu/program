import React, { Component } from 'react';
import { connect } from 'dva';

import {
  DatePicker, Menu, Dropdown, Icon, message, Tooltip, Form, Select, Modal,
  Cascader,
 } from 'antd';

const { RangePicker } = DatePicker;
class CommonFilter extends Component {
  constructor() {
    super();
    
    this.state = {
    };
  }
  // 日历操作
  onChangeFn = (date, dateString) => {
    this.props.upDataState({
      pageNum: 1, // 当前页数
      startTime: dateString[0], // 开始时间
      endTime: dateString[1], // 结束时间
    }, () => {
      this.props.sendRequest();
    });
  }

   /* 获取所属结构列表*/
   getConstruction() {
    verify((err, decoded) => {
      if (err) return;
      this.props.dispatch({
        type: 'userList/getConstruction',
        payload: {
          groupId: decoded.data.groupId,
          roleId: decoded.data.roleId,
        },
        callback: (res) => {
          const arr = [];
          // console.log(res);
          res.map((item, index) => {
            arr[index] = {};
            arr[index].value = res[index].areaId;
            arr[index].label = res[index].areaName;
            if (item.class.length > 0) {
              arr[index].children = [];
              item.class.map((cl, ind) => {
                arr[index].children[ind] = {};
                arr[index].children[ind].value = res[index].class[ind].classId;
                arr[index].children[ind].label = res[index].class[ind].className;
                if (cl.group.length > 0) {
                  arr[index].children[ind].children = [];
                  cl.group.map((gr, id) => {
                    arr[index].children[ind].children[id] = {};
                    arr[index].children[ind].children[id].value = res[index].class[ind].group[id].groupId;
                    arr[index].children[ind].children[id].label = res[index].class[ind].group[id].groupName;
                    return arr;
                  });
                }
                return arr;
              });
            }
            return arr;
          });
          this.setState({
            options: arr,
          });
        },
      });
    });
  }
// 更新state数据
upDataState(key, data, callback) {
  let object = {};
  if (typeof (key) === 'string') {
    object[key] = data;
  } else {
    object = key;
  }
  this.props.upDataState({
    ...this.state,
    ...object,
  }, () => {
    if (typeof (key) === 'object' && data) data();
    if (typeof (key) === 'string' && callback) callback();
  });
}
    // 级联下拉菜单
    onSelectChange = (val, d) => {
      console.log(val);
      const len = val.length;
      const groupId = val[len - 1];
      let area = 0;
      let classc = 0;
      let groupc = 0;
      if (len === 1) {
        area = val[0];
      } else if (len === 2) {
        area = val[0];
        classc = val[1];
      } else if (len === 3) {
        area = val[0];
        classc = val[1];
        groupc = val[2];
      }
      this.props.upDataState({
        groupId,
        area,
        classc,
        groupc,
        pageNum: 1,
      }, () => {
        this.props.sendRequest();
      });
    }

      // 重置
  reloadFn() {
    const {
      fileName,
      name,
      composition,
      area,
      classc,
      groupc,
      statusContent,
      status,
      startTime,
      endTime,
    } = this.props.state;
    if (fileName === '' && name === '' && composition === '' && status === '') return;
    this.props.upDataState({
      fileName: '',
      name: '',
      composition: '',
      status: '',
      statusContent: '任务状态',
    }, () => {
      this.props.sendRequest();
    });
  }
  render() {
    const { nameList, state } = this.props
    return (
      <div className="content-head">
      <div className="ch-top">
        <div className="search-input">
          <input
            type="text" placeholder="搜索内容"
            value={this.props.state.fileName}
            onChange={(e) => {
              this.props.upDataState('fileName', e.target.value.trim());
            }}
          />
          <span
            className="iconfont icon-qianwang"
            onClick={() => {
              if (!this.props.state.fileName.length) {
                message.warning('请输入搜索内容');
                return;
              }
              this.props.upDataState({
                pageNum: 1,
              }, () => {
                this.props.sendRequest();
              });
            }}
          />
        </div>
        <div className="search-condition">
          {/* 创建人 */}
          <div className="founder click-item maker" onClick={(e) => { this.makerClick(e); }}>
            <span className="mr-15">
              {
                this.props.state.name.length > 0 ? this.props.state.name : '创建人'
              }
            </span>
            <span className="iconfont icon-down-trangle zhankai" />
            <div className="trans-item trans-item-founder">
              <div className="founder-list">
                {
                  nameList && nameList.map((item, index) => {
                    return (
                      <span
                        key={index} className="list-item"
                        onClick={() => {
                          this.props.upDataState({ name: item.username, pageNum: 1, }, () => {
                            this.props.sendRequest();
                          });
                        }}
                      >{item.username}</span>
                    );
                  })
                }
              </div>
            </div>

          </div>
          {/* 结构 */}
          <div className="composition click-item">
            <Cascader
              allowClear={false}
              options={this.state.options}
              onChange={::this.onSelectChange}
              changeOnSelect={true}
              popupClassName="selectOptionsPop"
              expandTrigger="hover"
              placeholder="所属结构"
            />
          </div>
          {/* 任务状态 */}
          <div className="task-state click-item" onClick={(e) => { this.statusClick(e); }} >
            <span className="mr-15">{this.props.state.statusContent}</span>
            <span className="iconfont icon-down-trangle zhankai" />
            <div className="trans-item trans-item-state">
              <div className="task-state-list">
                {
                  this.props.state.statusList.map((item) => {
                    return (
                      <span
                        key={item.key} className="list-item"
                        onClick={() => {
                          this.props.upDataState({
                            statusContent: item.status,
                            status: item.retCode,
                            pageNum: 1, // 当前页数
                          }, () => {
                            this.props.sendRequest();
                          });
                        }}
                      >{item.status}</span>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
        {/* 日历 */}
        <div className="search-calendar">
          <div className="form-group d_t_dater">
            <div className="col-sm-12">
              <div className="input-group">
                <RangePicker onChange={this.onChangeFn.bind(this)} allowClear={false}/>
              </div>
            </div>
          </div>
        </div>
        <div className="reload-button">
          <Icon type="reload" onClick={::this.reloadFn} />
        </div>
      </div>
    </div>
    );
  }
}
export default connect(({userList }) => ({userList }))(CommonFilter);
