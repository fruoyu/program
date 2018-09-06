import React, { Component } from 'react';
import $ from 'jquery';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'dva';
import { Menu, Dropdown, Icon, Form, Input, Select, message, Modal, DatePicker, Tooltip } from 'antd';

import {
  CommonHeader,
  CommonTable,
  PolyDialog,
} from '../../components';
import '../../assets/iconfont/iconfont.css';
import './structure.less';
import {
  verify,
} from '../../utils/cookie';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
const { RangePicker } = DatePicker;

class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeDepartment: false,
      areaName: '',
      departmentName: '',
      changeDepartmentName: '',
      departmentId: '',
      departmentType: '',
      departmentLevel: '',
      assigningDepartmentName: '',
      groupId: '',
      levelList: [
        {
          content: '区',
          id: '2',
        },
        {
          content: '班',
          id: '3',
        },
        {
          content: '组',
          id: '4',
        },
      ],
      generationList: [
        {
          key: '2',
          generation: '区',
        },
        {
          key: '3',
          generation: '班',
        },
        {
          key: '4',
          generation: '组',
        },
      ],
      generation: '所属结构',
      addStructure: false,
      generationCode: '',
      whatPage: 1,
      addDepartmentName: '',
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      classList: [],
    };
    this.changeGeneration = this.changeGeneration.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.getAreaClassCons = this.getAreaClassCons.bind(this);
  }

  componentDidMount() {
    this.sendRequest();
  }

  // 日历操作
  onChangeFn = (date, dateString) => {
    this.setState({
      whatPage: 1,
      startTime: dateString[0], // 开始时间
      endTime: dateString[1], // 结束时间
    }, () => {
      this.sendRequest();
    });
  }
  // 获取添加内区班二级联动
  getAreaClassCons() {
    this.props.dispatch({
      type: 'structure/queryAreaClassCons',
    });
  }
  // 删除操作
  deleteAssign = (payloadId, payloadLevel) => {
    confirm({
      title: '确定删除吗?',
      onOk: () => {
        this.props.dispatch({
          type: 'structure/deleteAssignRoles',
          payload: {
            departmentId: payloadId,
            departmentLevel: payloadLevel,
          },
          callback: () => {
            this.sendRequest();
            message.success('删除成功', 1);
          },
        });
      },
      onCancel() {
      },
    });
  }

  // 修改部门名称确定事件
  preDepartment = () => {
    this.setState({
      changeDepartment: false,
      changeDepartmentName: '',
    });
    this.props.dispatch({
      type: 'structure/changeDepartmentName',
      payload: {
        departmentId: `${this.state.departmentId}`,
        departmentLevel: `${this.state.departmentLevel}`,
        modifyDepartmentName: this.state.changeDepartmentName,
      },
      callback: () => {
        this.sendRequest();
      },
    });
  }

  updataState = (content, id) => {
    this.setState({
      areaName: content,
      departmentType: id,
    }, () => {
      this.sendRequest();
    });
  }
  /* 结构转换*/
  changeGeneration =(code) => {
    const generation = this.state.generationList.filter(item => item.key === code)[0].generation;
    return generation;
  }
  // 添加部门
  addStructure = () => {
    this.props.form.validateFields((err, value) => {
      if (err) return;
      const InputContent = value.areaName ? value.areaName : (
        value.className ? value.className : (
          value.groupName ? value.groupName : null
        )
      );
      this.props.dispatch({
        type: 'structure/addStructure',
        payload: {
          areaId: value.areaId ? value.areaId : '',
          classId: value.classId ? value.classId : '',
          departmentName: InputContent,
          departmentType: value.departmentType,
        },
        callback: () => {
          this.setState({
            addStructure: false,
          }, () => {
            message.success('添加成功!', 1);
            this.sendRequest();
          });
        },
      });
    });
  }
  // 级别选择
  handleSelect =(value) => {
    this.setState({
      generationCode: value,
    });
  }
  // 区改变
  areaChangeFn = (value) => {
    const {
      AreaClassConsList,
    } = this.props.structure;
    const classList = AreaClassConsList.filter(item => item.areaId === value)[0].class;
    this.setState({
      classList,
    });
  }
  // 分页
  changePageNum(page) {
    this.setState({
      whatPage: page,
    }, () => {
      this.sendRequest();
    });
  }
  // 查询请求
  sendRequest =() => {
    this.props.dispatch({
      type: 'structure/getAssignRolesList',
      payload: {
        areaId: '',
        classId: '',
        departmentId: '',
        departmentName: this.state.departmentName,
        departmentType: this.state.departmentType,
        groupId: '',
        pageSize: '10',
        whatPage: this.state.whatPage,
        startTime: this.state.startTime, // 开始时间
        endTime: this.state.endTime, // 结束时间
      },
    });
  }
  searchUsers = () => {
    verify((err, decoded) => {
      if (err) return;
      this.props.dispatch({
        type: 'structure/searchUsers',
        payload: {
          roleTypeList: [decoded.data.roleId == 1 ? '' : decoded.data.roleId],
          whetherBind: '0',
        },
      });
      this.props.dispatch({
        type: 'structure/searchUsers',
        payload: {
          roleTypeList: [decoded.data.roleId == 1 ? '' : decoded.data.roleId],
          whetherBind: '1',
        },
      });
    });
  }

  // 分配用户确定事件
  preUsers = () => {
    this.props.dispatch({
      type: 'structure/distributionUsers',
      payload: {
        groupId: this.state.groupId,
        userIdList: this.props.structure.notOwnedUsers.map(item => {
          return item.id + '';
        }),
      },
      callback: () => {
        this.setState({
          assigningUsers: false,
        });
      },
    });
  }

  render() {
    const {
      assignRolesList = [],
      ownedUsers = [],
      notOwnedUsers = [],
      AreaClassConsList,
      count,
    } = this.props.structure;
    const tabHead = ['部门名称', '部门级别', '区', '班', '组'];
    const { getFieldDecorator } = this.props.form;
    const generation = (
      <Menu
        className="composition-down-load"
        onClick={(item) => {
          this.setState({
            whatPage: 1,
            departmentType: item.key,
            generation: this.changeGeneration(item.key),
          }, () => {
            this.sendRequest();
          });
        }}
      >
        {
          this.state.generationList.map((item) => {
            return <Menu.Item key={item.key}>{item.generation}</Menu.Item>;
          })
        }
      </Menu>
    )
    return (
      <div id='structure' className="bootContent historyContent structureContent">
        <Scrollbars>
          <CommonHeader title="结构管理" isMain isUserPort customer />
          <div className='structure-box' id="content">
            <div className='structure-header content-head' >
              <div className="ch-top">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder={this.state.departmentName == '' ? '部门名称' : this.state.departmentName}
                    onChange={(e) => {
                      this.setState({
                        departmentName: e.target.value.trim(),
                      });
                      // this.updataState('fileName', e.target.value.trim());
                    }}
                  />
                  <span
                    className="iconfont icon-qianwang"
                    onClick={() => {
                      if (!this.state.departmentName.length) {
                        message.warning('部门名称不能为空', 1);
                        return false;
                      }
                      this.setState({
                        whatPage: 1,
                      }, () => {
                        this.sendRequest();
                      });
                    }}
                  />
                </div>
                <div className="search-condition">
                  <div className="generation click-item">
                    <Dropdown overlay={generation} trigger={['click']}>
                      <span className="ant-dropdown-link">
                        {this.state.generation}<Icon type="down" />
                      </span>
                    </Dropdown>
                  </div>
                </div>
                {/* 日历 */}
                <div className="search-calendar">
                  <div className="form-group d_t_dater">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <RangePicker onChange={::this.onChangeFn} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="buttonCont"
                onClick={() => {
                  this.setState({
                    departmentName: '',
                    departmentType: '',
                    startTime: '', // 开始时间
                    endTime: '', // 结束时间
                    generationCode: '',
                    addStructure: true,
                  });
                  this.getAreaClassCons();
                }}
              >添加部门</div>
            </div>
            <CommonTable
              filesList={assignRolesList}
              tabHead={tabHead}
              options="操作"
              total={count * 1}
              onChangePage={(pageNumber) => {
                this.changePageNum(pageNumber);
              }}
            >
              {
                assignRolesList.map((item, index) => (
                  <li className="content-item" key={index}>
                    <div className="item-title">{typeof item.groupName == null ? '' : item.groupName}</div>
                    <div className="item-author">{item.roleLevel == 2 ? '区' : (item.roleLevel == 3 ? '班' : '组')}</div>
                    <div className="item-composition">{item.standbyFlag1 == null ? '' : item.standbyFlag1}</div>
                    <div className="item-state">{item.standbyFlag2 == null ? '' : item.standbyFlag2}</div>
                    <div className="item-time">{item.standbyFlag3 == null ? '' : item.standbyFlag3}</div>
                    <div className="item-options">
                      <Tooltip placement="bottom" title="编辑">
                        <span
                          className="iconfont icon-biaozhugongju"
                          onClick={() => {
                            this.setState({
                              changeDepartment: true,
                              departmentId: item.groupId,
                              departmentLevel: item.roleLevel,
                            });
                          }}
                        />
                      </Tooltip>
                      <Tooltip placement="bottom" title="删除">
                        <span
                          className="iconfont icon-shanchu"
                          onClick={() => {
                            this.deleteAssign(item.groupId, item.roleLevel);
                          }}
                        />
                      </Tooltip>
                      <Tooltip placement="bottom" title="用户分配">
                        <span
                          className="iconfont icon-yonghu"
                          onClick={() => {
                            this.setState({
                              assigningUsers: true,
                              assigningDepartmentName: item.groupName
                            });
                            this.searchUsers();
                          }}
                        />
                      </Tooltip>
                    </div>
                  </li>
                ))
              }
            </CommonTable>
          </div>
        </Scrollbars>
        {/* 修改部门名称 */}
        {
          this.state.changeDepartment &&
          <PolyDialog
            title="更新部门"
            visible={this.state.changeDepartment}
            style={{ height: '200px' }}
            onClose={() => {
              this.setState({
                changeDepartment: false,
                changeDepartmentName: '',
              });
            }}
            onOk={() => {
              this.preDepartment();
            }}
            onCancel={() => {
              this.setState({
                changeDepartment: false,
                changeDepartmentName: '',
              });
            }}
          >
            <div className='change-department'>
              <div className='dialog-top'>
                <text><span>*</span>部门名称:</text>
                <input
                  placeholder={this.state.changeDepartmentName == '' ? '请输入部门名称' : this.state.changeDepartmentName}
                  onChange={(e) => {
                    this.setState({
                      changeDepartmentName: e.target.value.trim(),
                    });
                  }}
                >
                </input>
              </div>
            </div>
          </PolyDialog>
        }
        {/* 分配用户 */}
        {
          this.state.assigningUsers &&
          <PolyDialog
            visible={this.state.assigningUsers}
            style={{ width: 600, height: 520 }}
            onClose={() => {
              this.setState({
                assigningUsers: false,
              });
            }}
            onOk={() => {
              this.preUsers();
            }}
            onCancel={() => {
              this.setState({
                assigningUsers: false,
              });
            }}
          >
            <div className='assigning-users'>
              <div className='assigning-top dialog-top'>
                <text><span>*</span>部门名称:</text>
                <input
                  placeholder={this.state.assigningDepartmentName}
                  disabled
                  onChange={(e) => {
                    this.setState({
                      changeDepartmentName: e.target.value.trim(),
                    });
                  }}
                >
                </input>
              </div>
              <div className='assigning-middle'>
                <p>部门设置</p>
                <div className='haventUsers'>
                  <p>未拥有用户</p>
                  <p>{notOwnedUsers.length}条记录</p>
                  <div>
                    <p
                      onClick={() => {
                        this.props.dispatch({
                          type: 'structure/saveOwnedUsers',
                          payload: {
                            ownedUsers: [...notOwnedUsers, ...ownedUsers],
                            notOwnedUsers: [],
                          },
                        });
                      }}
                    >
                      <img src={require('../../assets/image/havent.png')}></img>
                    </p>
                    <ul>
                      {
                        notOwnedUsers.map((item, index) => (
                          <li
                            key={index}
                            style={{ background: index % 2 == 0 ? '#fff' : '#f6f4ff' }}
                            onClick={() => {
                              let tempOwnedUsers = ownedUsers;
                              tempOwnedUsers.unshift(item);
                              let tempNotOwnedUsers = notOwnedUsers;
                              tempNotOwnedUsers.splice(index, 1);
                              this.props.dispatch({
                                type: 'structure/saveOwnedUsers',
                                payload: {
                                  ownedUsers: tempOwnedUsers,
                                  notOwnedUsers: tempNotOwnedUsers,
                                },
                              });
                            }}
                          >{item.realname}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <div className='haveUsers'>
                  <p>已拥有用户</p>
                  <p>{ownedUsers.length}条记录</p>
                  <div>
                    <p
                      onClick={() => {
                        this.props.dispatch({
                          type: 'structure/saveOwnedUsers',
                          payload: {
                            notOwnedUsers: [...ownedUsers, ...notOwnedUsers],
                            ownedUsers: [],
                          },
                        });
                      }}
                    >
                      <img src={require('../../assets/image/have.png')}></img>
                    </p>
                    <ul>
                      {
                        ownedUsers.map((item, index) => (
                          <li
                            key={index}
                            style={{ background: index % 2 == 0 ? '#fff' : '#f6f4ff' }}
                            onClick={() => {
                              let tempOwnedUsers = ownedUsers;
                              tempOwnedUsers.splice(index, 1);
                              let tempNotOwnedUsers = notOwnedUsers;
                              tempNotOwnedUsers.unshift(item);
                              this.props.dispatch({
                                type: 'structure/saveOwnedUsers',
                                payload: {
                                  ownedUsers: tempOwnedUsers,
                                  notOwnedUsers: tempNotOwnedUsers,
                                },
                              });
                            }}
                          >{item.realname}</li>
                        ))
                      }

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </PolyDialog>
        }
        {/* 添加部门*/}
        {
          this.state.addStructure && <PolyDialog
            visible={this.state.addStructure}
            style={{
              height: 'auto',
              paddingBottom: 40,
            }}
            onClose={() => {
              this.setState({
                addStructure: false,
              });
            }}
            onOk={::this.addStructure}
            onCancel={() => {
              this.setState({
                addStructure: false,
              });
            }}
          >
            <Form className="user-form-dailog">

              <FormItem className="line-item" label="部门级别">
                {getFieldDecorator('departmentType', {
                  rules: [{ required: true, message: '请选择部门级别!' }],
                })(
                  <Select
                    placeholder="选择所添加的部门级别"
                    onChange={this.handleSelect}
                  >
                    {
                      this.state.generationList.map((item) => {
                        return <Option value={item.key} key={item.key}>{item.generation}</Option>;
                      })
                    }
                  </Select>,
                )}
              </FormItem>
              {
                (this.state.generationCode === '3' || this.state.generationCode === '4') && <FormItem className="line-item" label="区">
                  {getFieldDecorator('areaId', {
                    rules: [{ required: true, message: '请选择区!' }],
                  })(
                    <Select
                      placeholder="请选择区"
                      onChange={::this.areaChangeFn}
                    >
                      {
                        AreaClassConsList.map((item, index) => {
                          return (
                            <Option value={item.areaId} key={index}>{item.areaName}</Option>
                          );
                        })
                      }
                    </Select>,
                  )}
                </FormItem>
              }
              {
                this.state.generationCode === '4' && <FormItem className="line-item" label="班">
                  {getFieldDecorator('classId', {
                    rules: [{ required: true, message: '请选择班!' }],
                  })(
                    <Select
                      placeholder="请选择班"
                    >
                      {
                        this.state.classList.length > 0 ? (
                          this.state.classList.map((item, index) => {
                            return (
                              <Option value={item.classId} key={index}>{item.className}</Option>
                            );
                          })
                        ) : <Option value="0" disabled>无数据</Option>
                      }
                    </Select>,
                  )}
                </FormItem>
              }

              {
                this.state.generationCode === '2' &&
                <FormItem hasFeedback className="line-item" label="区名">
                  {getFieldDecorator('areaName', {
                    rules: [{ required: true, message: '请输入区' }],
                  })(
                    <Input placeholder="请填写区名" type="text" />,
                  )}
                </FormItem>
              }
              {
                this.state.generationCode === '3' &&
                <FormItem hasFeedback className="line-item" label="班名">
                  {getFieldDecorator('className', {
                    rules: [{ required: true, message: '请输入班名' }],
                  })(
                    <Input placeholder="请填写班名" type="text" />,
                  )}
                </FormItem>
              }
              {
                this.state.generationCode === '4' &&
                <FormItem hasFeedback className="line-item" label="组名">
                  {getFieldDecorator('groupName', {
                    rules: [{ required: true, message: '请输入组名' }],
                  })(
                    <Input placeholder="请填写组名" type="text" />,
                  )}
                </FormItem>
              }
            </Form>
          </PolyDialog>
        }
      </div>
    );
  }
}
export default connect(({ structure }) => ({ structure }))(Form.create()(Structure));
