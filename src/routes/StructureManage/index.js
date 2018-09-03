import React, { Component } from 'react';
import $ from 'jquery';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'dva';
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

class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeDepartment: false,
      areaName: '',
      departmentName: '',
      changeDepartmentName: '',
      departmentId: '',
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
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'structure/getAssignRolesList',
      payload: {
        areaId: "",
        classId: "",
        departmentId: "",
        departmentName: "",
        departmentType: "",
        groupId: "",
        pageSize: '10',
        whatPage: '1',
      },
      callback: () => {
        console.log(this.props.structure.assignRolesList);
      },
    });
  }

  deleteAssign = (payloadId, payloadLevel) => {
    this.props.dispatch({
      type: 'structure/deleteAssignRoles',
      payload: {
        departmentId: payloadId,
        departmentLevel: payloadLevel,
      },
      callback: () => {
        this.props.dispatch({
          type: 'structure/getAssignRolesList',
          payload: {
            areaId: "",
            classId: "",
            departmentId: "",
            departmentName: "",
            departmentType: "",
            groupId: "",
            pageSize: '10',
            whatPage: '1',
          },
        });
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
        departmentId: this.state.departmentId + '',
        departmentLevel: this.state.departmentLevel + '',
        modifyDepartmentName: this.state.changeDepartmentName,
      },
      callback: () => {
        this.props.dispatch({
          type: 'structure/getAssignRolesList',
          payload: {
            areaId: "",
            classId: "",
            departmentId: "",
            departmentName: "",
            departmentType: "",
            groupId: "",
            pageSize: '10',
            whatPage: '1',
          },
        });
      },
    });
  }

  makerClick = (e) => {
    e.stopPropagation();
    $('.maker').find('.zhankai').toggleClass('rotate');
    $('.task-state').find('.zhankai').removeClass('rotate');
    $('.maker').find('.trans-item').slideToggle().toggleClass('active');
    $('.maker').siblings('.click-item').find('.trans-item').slideUp().removeClass('active');
  }

  updataState = (content, id) => {
    this.setState({
      areaName: content,
    }, () => {
      this.props.dispatch({
        type: 'structure/getAssignRolesList',
        payload: {
          areaId: '',
          classId: '',
          departmentId: "",
          departmentName: "",
          departmentType: id,
          groupId: "",
          pageSize: '10',
          whatPage: '1',
        },
      });
    });
  }

  findName = () => {
    this.props.dispatch({
      type: 'structure/getAssignRolesList',
      payload: {
        areaId: '',
        classId: '',
        departmentId: '',
        departmentName: this.state.departmentName,
        departmentType: '',
        groupId: '',
        pageSize: '10',
        whatPage: '1',
      },
    });
  }

  searchUsers = () => {
    verify((err, decoded) => {
      if (err) return;
      this.props.dispatch({
        type: 'structure/searchUsers',
        payload: {
          roleTypeList: [decoded.data.roleId],
          whetherBind: '0',
        },
      });
      this.props.dispatch({
        type: 'structure/searchUsers',
        payload: {
          roleTypeList: [decoded.data.roleId],
          whetherBind: '1',
        },
      });
    });
  }

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
      }
    });
  }

  render() {
    let {
      assignRolesList = [],
      ownedUsers = [],
      notOwnedUsers = [],
    } = this.props.structure;
    const tabHead = ['部门名称', '部门级别', '区', '班', '组', '操作']
    return (
      <div id='structure' className="bootContent">
        <Scrollbars>
          <CommonHeader title="结构管理" isMain />
          <div className='structure-box'>
            <div className='structure-header'>
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
                    this.findName();
                  }} />
              </div>
              <div className="search-condition">
                <div>所在组织</div>
                <div className="founder click-item maker" onClick={(e) => { this.makerClick(e); }}>
                  <span className="mr-15">
                    {
                      this.state.areaName.length > 0 ? this.state.areaName : '区'
                    }
                  </span>
                  <span className="iconfont icon-down-trangle zhankai" />
                  <div className="trans-item trans-item-founder">
                    <div className="founder-list">
                      {
                        this.state.levelList.map((item, index) => (
                          <span
                            className="list-item"
                            key={index}
                            onClick={() => {
                              this.updataState(item.content, item.id);
                            }}
                          >
                            {item.content}
                          </span>
                        ))
                      }
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <CommonTable
              filesList={assignRolesList}
              tabHead={tabHead}
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
                    <div className="data">
                      <span
                        onClick={() => {
                          this.setState({
                            changeDepartment: true,
                            departmentId: item.groupId,
                            departmentLevel: item.roleLevel,
                          });
                        }}
                      >修改</span>
                      <span
                        onClick={() => {
                          this.deleteAssign(item.groupId, item.roleLevel);
                        }}
                      >
                        删除
                      </span>
                      <span
                        onClick={() => {
                          this.setState({
                            assigningUsers: true,
                            assigningDepartmentName: item.groupName
                          });
                          this.searchUsers();
                        }}
                      >分配用户</span>
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
            title='更新部门'
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
      </div>
    )
  }
}
export default connect(({ structure }) => ({ structure }))(Structure);
