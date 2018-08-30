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

class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeDepartment: false,

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

  preDepartment = () => {

  }

  render() {
    let {
      assignRolesList
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
                  type="text" placeholder="搜索内容"
                  onChange={(e) => {
                    this.updataState('fileName', e.target.value.trim());
                  }}
                />
                <span className="iconfont icon-qianwang" onClick={this.sendRequest} />
              </div>
              <div className="search-condition">
                
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
                          });
                        }}
                      >分配用户</span>
                    </div>
                  </li>
                ))
              }
            </CommonTable>
          </div>
        </Scrollbars>
        {
          this.state.changeDepartment &&
          <PolyDialog
            title='更新部门'
            visible={this.state.changeDepartment}
            onClose={() => {
              this.setState({
                changeDepartment: false,
              });
            }}
            onOk={() => {
              this.preDepartment();
            }}
            onCancel={() => {
              this.setState({
                changeDepartment: false,
              });
            }}
          >
            <div>
              <text>修改部门名称</text>
            </div>
          </PolyDialog>
        }
        {
          this.state.assigningUsers &&
          <PolyDialog
            title='绑定部门用户'
            visible={this.state.assigningUsers}
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
            <div>
              <text>绑定部门用户</text>
            </div>
          </PolyDialog>
        }
      </div>
    )
  }
}
export default connect(({ structure }) => ({ structure }))(Structure);
