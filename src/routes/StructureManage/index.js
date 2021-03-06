import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'dva';
import { Menu, Form, Input, Select, message, Modal, DatePicker, Tooltip } from 'antd';
import {
  CommonHeader,
  CommonTable,
  PolyDialog,
  CommonFilter,
} from '../../components';
import '../../assets/iconfont/iconfont.css';
import './structure.less';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      changeDepartment: false,
      areaName: '',
      searchThing: '',
      changesearchThing: '',
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
      pageNum: 1,
      addDepartmentName: '',
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      classList: [],
      userGroupId: '',
      userRoleLevel: '',
      stateOwnedUsers: [],
      stateNotOwnedUsers: [],
    };
    this.changeGeneration = this.changeGeneration.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.upDataState = this.upDataState.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.getAreaClassCons = this.getAreaClassCons.bind(this);
  }

  componentDidMount() {
    this.sendRequest();
  }

  // 日历操作
  onChangeFn = (date, dateString) => {
    this.setState({
      pageNum: 1,
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

  // 更新state数据
  upDataState(key, data, callback) {
    let object = {};
    if (typeof (key) === 'string') {
      object[key] = data;
    } else {
      object = key;
    }
    this.setState({
      ...this.state,
      ...object,
    }, () => {
      if (typeof (key) === 'object' && data) data();
      if (typeof (key) === 'string' && callback) callback();
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
      pageNum: page,
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
        departmentName: this.state.searchThing,
        departmentType: this.state.departmentType,
        groupId: '',
        pageSize: '10',
        whatPage: this.state.pageNum,
        startTime: this.state.startTime, // 开始时间
        endTime: this.state.endTime, // 结束时间
      },
    });
  }
  searchUsers = (roleLevel, groupId) => {
    const n = 3;
    let result = [];
    switch (this.state.userRoleLevel){
      case '1':
        result = [''];
        break;
      case '2':
        result = [this.state.userRoleLevel];
        break;
      case '3':
        result = [this.state.userRoleLevel];
        break;
      default:
        result = [4, 5];
    };
    this.props.dispatch({
      type: 'structure/searchUsers',
      payload: {
        roleTypeList: result,
        whetherBind: '0',
        groupId: '',
      },
      callback: () => {
        this.setState({
          stateNotOwnedUsers: this.props.structure.notOwnedUsers,
        });
      },
    });
    this.props.dispatch({
      type: 'structure/searchUsers',
      payload: {
        roleTypeList: result,
        whetherBind: '1',
        groupId: this.state.userGroupId + '',
      },
      callback: () => {
        this.setState({
          stateOwnedUsers: this.props.structure.ownedUsers,
        });
      },
    });
  }

  // 分配用户确定事件
  preUsers = () => {
    const {
      ownedUsers,
      notOwnedUsers,
    } = this.props.structure;
    // if (ownedUsers.length == 0) {
    //   notifyWarning('已拥有用户不能为空');
    // } else if (notOwnedUsers.length == 0) {
    //   notifyWarning('未拥有用户不能为空');
    // } else {
      this.props.dispatch({
        type: 'structure/distributionUsers',
        payload: {
          groupId: this.state.userGroupId + '',
          userIdList: ownedUsers.length == 0 ? [''] : ownedUsers.map(item => {
            return item.id + '';
          }),
        },
        callback: () => {
          this.setState({
            assigningUsers: false,
          });
        },
      });
      this.props.dispatch({
        type: 'structure/distributionUsers',
        payload: {
          groupId: '',
          userIdList: notOwnedUsers.length == 0 ? [''] : notOwnedUsers.map(item => {
            return item.id + '';
          }),
        },
        callback: () => {
          this.setState({
            assigningUsers: false,
          });
        },
      });
    // }
  }
  // 重置
  reloadFn() {
    const {
      searchThing,
      startTime,
      endTime,
      departmentType,
    } = this.state;

    const a = [
      searchThing,
      startTime,
      endTime,
      departmentType,
      ].some((el)=>{
        return el.length>0
      });
    if (!a) return;

    this.setState({
      searchThing:'',
      startTime:'',
      endTime:'',
      generation:'所属结构',
      departmentType:'',
      flag:false
    }, () => {
      this.setState({flag: true})
      this.sendRequest();
    });
  }

  // 部门级别
  groupName = (roleLevel) => {
    if (roleLevel == 2) {
      return '区';
    } else if (roleLevel == 3) {
      return '班';
    } else if (roleLevel == 4) {
      return '组';
    }
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
    let {
      stateNotOwnedUsers,
      stateOwnedUsers
    } = this.state;
    const generation = (
      <Menu
        className="composition-down-load"
        onClick={(item) => {
          this.setState({
            pageNum: 1,
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
          <CommonHeader title="结构管理" isMain isUserPort customer home />
          <div className='structure-box' id="content">
          {
            this.state.flag && <CommonFilter
              searchTitle={this.state.searchThing === '' ? '部门名称' : this.state.searchThing}
              state={this.state}
              addBtn
              department={generation}
              upDataState={::this.upDataState}
              sendRequest={::this.sendRequest}
              onChangeFn={::this.onChangeFn}
              reloadFn={::this.reloadFn}
              getAreaClassCons={::this.getAreaClassCons}
            />
          }
            <CommonTable
              filesList={assignRolesList}
              tabHead={tabHead}
              current={this.state.pageNum}
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
                    <div className="item-author">{this.groupName(item.roleLevel)}</div>
                    <div className="item-composition">{item.standbyFlag1 == null ? '' : item.standbyFlag1}</div>
                    <div className="item-state">{item.standbyFlag2 == null ? '' : item.standbyFlag2}</div>
                    <div className="item-time">{item.standbyFlag3 == null ? '' : item.standbyFlag3}</div>
                    <div className="item-options">
                      <Tooltip placement="bottom" title="修改名称">
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
                              assigningDepartmentName: item.groupName,
                              userGroupId: item.groupId,
                              userRoleLevel: item.roleLevel,
                            }, () => {
                              this.searchUsers(item.roleLevel, item.groupId);
                            });
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
                    <p>
                      <input
                        placeholder='请输入'
                        value={this.state.notOwnedValue}
                        onChange={(e) => {
                          let tempArr = [];
                          if (e.currentTarget.value == '') {
                            this.props.dispatch({
                              type: 'structure/saveOwnedUsers',
                              payload: {
                                notOwnedUsers: this.state.stateNotOwnedUsers,
                              },
                            });
                          } else {
                            this.state.stateNotOwnedUsers.map((ownedItem, ownedIndex) => {
                              if (ownedItem.standbyFlag1.indexOf(e.currentTarget.value) != -1) {
                                tempArr.push(ownedItem);
                              }
                            });
                            this.props.dispatch({
                              type: 'structure/saveOwnedUsers',
                              payload: {
                                notOwnedUsers: tempArr,
                              },
                            });
                          }
                        }}
                      />
                      <img
                        src={require('../../assets/image/havent.png')}
                        onClick={() => {
                          this.props.dispatch({
                            type: 'structure/saveOwnedUsers',
                            payload: {
                              ownedUsers: [...notOwnedUsers, ...ownedUsers],
                              notOwnedUsers: [],
                            },
                            callback: () => {
                              this.setState({
                                stateNotOwnedUsers: [],
                                stateOwnedUsers: [...notOwnedUsers, ...ownedUsers],
                              });
                            },
                          });
                        }}
                      />
                    </p>
                    <ul>
                      <Scrollbars>
                        {
                          notOwnedUsers.map((item, index) => {
                            return <li
                              key={index}
                              style={{ background: index % 2 == 0 ? '#fff' : '#f6f4ff' }}
                              onClick={() => {
                                console.log(item)
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
                                  callback: () => {
                                    this.setState({
                                      stateNotOwnedUsers: tempNotOwnedUsers,
                                      stateOwnedUsers: tempOwnedUsers,
                                    })
                                  },
                                });
                              }}
                            >{item.username}-{item.realname}</li>
                          })
                        }
                      </Scrollbars>
                    </ul>
                  </div>
                </div>
                <div className='haveUsers'>
                  <p>已拥有用户</p>
                  <p>{ownedUsers.length}条记录</p>
                  <div>
                    <p>
                      <img
                        src={require('../../assets/image/have.png')}
                        onClick={() => {
                          this.props.dispatch({
                            type: 'structure/saveOwnedUsers',
                            payload: {
                              notOwnedUsers: [...ownedUsers, ...notOwnedUsers],
                              ownedUsers: [],
                            },
                            callback: () => {
                              this.setState({
                                stateNotOwnedUsers: [...ownedUsers, ...notOwnedUsers],
                                stateOwnedUsers: [],
                              });
                            },
                          });
                        }}
                      />
                      <input
                        placeholder='请输入'
                        value={this.state.ownedValue}
                        onChange={(e) => {
                          let tempArr = [];
                          if (e.currentTarget.value == '') {
                            this.props.dispatch({
                              type: 'structure/saveOwnedUsers',
                              payload: {
                                ownedUsers: this.state.stateOwnedUsers,
                              },
                            });
                          } else {
                            stateOwnedUsers.map((ownedItem, ownedIndex) => {
                              if (ownedItem.standbyFlag1.indexOf(e.currentTarget.value) != -1) {
                                tempArr.push(ownedItem);
                              }
                            });
                            this.props.dispatch({
                              type: 'structure/saveOwnedUsers',
                              payload: {
                                ownedUsers: tempArr,
                              },
                            });
                          }
                        }}
                      />
                    </p>
                    <ul>
                      <Scrollbars>
                        {
                          ownedUsers.map((item, index) => {
                            return <li
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
                                  callback: () => {
                                    this.setState({
                                      stateNotOwnedUsers: tempNotOwnedUsers,
                                      stateOwnedUsers: tempOwnedUsers,
                                    });
                                  },
                                });
                              }}
                            >{item.username}-{item.realname}</li>
                          })
                        }
                      </Scrollbars>
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
