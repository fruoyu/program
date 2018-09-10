import React, { Component } from 'react';
import { connect } from 'dva';
import { verify } from '../../utils/cookie';
import {
  DatePicker, Menu, Dropdown, Icon, message, Tooltip, Form, Select, Modal,
  Cascader,
 } from 'antd';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

class CommonFilter extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
    if (!this.props.addBtn) {
      this.getConstruction();
    }
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
                    arr[index].children[ind].children[id].value =
                      res[index].class[ind].group[id].groupId;
                    arr[index].children[ind].children[id].label =
                      res[index].class[ind].group[id].groupName;
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
  render() {
    const { options, state, status, searchTitle, generation, addBtn } = this.props;
    return (
      <div className="content-head">
      <div className="ch-top">
        <div className="search-input">
          <input
            type="text" placeholder={searchTitle}
            value={state.fileName}
            onChange={(e) => {
              this.props.upDataState('searchThing', e.target.value.trim());
            }}
          />
          <span
            className="iconfont icon-qianwang"
            onClick={() => {
              if (!this.props.state.searchThing.length) {
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
          {
            options && <div className="founder click-item maker" id="maker">
              <Dropdown
                overlay={this.props.options} trigger={['click']}
                getPopupContainer={() => document.getElementById('maker')}
              >
                <span className="ant-dropdown-link">
                  {
                    state.name.length > 0 ? state.name : '创建人'
                  }<Icon type="down" />
                </span>
              </Dropdown>
            </div>
          }
          {/* 所属角色 */}
          {
            generation && <div className="generation click-item" id="gen">
              <Dropdown
                overlay={this.props.generation} trigger={['click']}
                getPopupContainer={() => document.getElementById('gen')}
              >
                <span className="ant-dropdown-link">
                  {this.props.state.generation}<Icon type="down" />
                </span>
              </Dropdown>
            </div>
          }
          {/* 结构 */}
          {
            addBtn ? <div className="search-condition">
              <div className="generation click-item" id="bumen">
                <Dropdown
                  overlay={this.props.department} trigger={['click']}
                  getPopupContainer={() => document.getElementById('bumen')}
                >
                  <span className="ant-dropdown-link">
                    {state.generation}<Icon type="down" />
                  </span>
                </Dropdown>
              </div>
            </div> : <div className="composition click-item" id="jieg">
              <Cascader
                allowClear={false}
                options={this.state.options}
                onChange={this.props.onSelectChange}
                changeOnSelect={true}
                popupClassName="selectOptionsPop"
                expandTrigger="hover"
                placeholder="所属结构"
                getPopupContainer={() => document.getElementById('jieg')}
              />
            </div>
          }
          {/* 任务状态 */}
          {
            status && <div className="task-state click-item" id="task-state">
              <Dropdown
                overlay={this.props.status} trigger={['click']}
                getPopupContainer={() => document.getElementById('task-state')}
              >
                <span className="ant-dropdown-link">
                  {this.props.state.statusContent}<Icon type="down" />
                </span>
              </Dropdown>
            </div>
          }
        </div>
        {/* 日历 */}
        <div className="search-calendar">
          <div className="form-group d_t_dater">
            <div className="col-sm-12">
              <div className="input-group">
                <RangePicker onChange={this.props.onChangeFn} allowClear={false} />
              </div>
            </div>
          </div>
        </div>
        {/* 重置 */}
        <div className="reload-button">
          <Tooltip placement="bottom" title="重置">
            <Icon type="reload" onClick={this.props.reloadFn} />
          </Tooltip>
        </div>
        {/* 添加按钮*/}
        {
          addBtn &&
          <div
            className="buttonCont"
            onClick={() => {
              this.props.upDataState({
                searchThing: '',
                departmentType: '',
                startTime: '', // 开始时间
                endTime: '', // 结束时间
                generationCode: '',
                addStructure: true,
              });
              this.props.getAreaClassCons();
            }}
          >添加部门</div>
        }
      </div>
      </div>
    );
  }
}
export default connect(({ userList }) => ({ userList }))(CommonFilter);
