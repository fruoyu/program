import React, { Component } from 'react';
import $ from 'jquery';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'dva';
import { Menu, Dropdown, Icon, Form, Input, Select, message, Modal } from 'antd';

import {
  CommonHeader,
  CommonTable,
  PolyDialog,
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
      changeDepartment: false,
      areaName: '',
      departmentName: '',
      changeDepartmentName: '',
      departmentId: '',
      departmentType: '',
      departmentLevel: '',
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
          key: '1',
          generation: '区',
        },
        {
          key: '2',
          generation: '班',
        },
        {
          key: '3',
          generation: '组',
        },
      ],
      generation: '所属结构',
      addStructure: false,
      generationCode: '',
      whatPage: '1',
    };
    this.changeGeneration = this.changeGeneration.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  componentDidMount() {
    this.sendRequest();
  }
  // 查询请求
  sendRequest =() => {
    this.props.dispatch({
      type: 'structure/getAssignRolesList',
      payload: {
        areaId: "",
        classId: "",
        departmentId: "",
        departmentName: this.state.departmentName,
        departmentType: this.state.departmentType,
        groupId: "",
        pageSize: '10',
        whatPage: this.state.whatPage,
      },
      callback: () => {
        console.log(this.props.structure.assignRolesList);
      },
    });
  }
  // 删除操作
  deleteAssign = (payloadId, payloadLevel) => {
    confirm({
      title: '确定删除该录音吗?',
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
        departmentId: this.state.departmentId + '',
        departmentLevel: this.state.departmentLevel + '',
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
      console.log(value);
    });
  }
  // 级别选择
  handleSelect =(value) => {
    this.setState({
      generationCode: value,
    });
    console.log(value);
  }
  findName = () => {
    this.sendRequest();
  }
  // 分页
  changePageNum(page) {
    this.setState({
      whatPage: page,
    }, () => {

    });
  }

  render() {
    const {
      assignRolesList,
    } = this.props.structure;
    const tabHead = ['部门名称', '部门级别', '区', '班', '组'];
    const { getFieldDecorator } = this.props.form;
    const generation = (
      <Menu
        className="composition-down-load"
        onClick={(item) => {
          this.setState({
            roleId: item.key,
            generation: this.changeGeneration(item.key),
          }, () => {
            // this.sendRequest();
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
          <CommonHeader title="结构管理" isMain />
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
                      this.findName();
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
                <div className="search-calendar" />
              </div>
              <div
                className="buttonCont"
                onClick={() => {
                  this.setState({
                    generationCode: '',
                    addStructure: true,
                  });
                }}
              >添加部门</div>
            </div>
            <CommonTable
              filesList={assignRolesList}
              tabHead={tabHead}
              options="操作"
              total={20}
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
                      <span
                        className="iconfont icon-shanchu"
                        onClick={() => {
                          this.deleteAssign(item.groupId, item.roleLevel);
                        }}
                      />
                      <span
                        className="iconfont icon-yonghu"
                        onClick={() => {
                          this.setState({
                            assigningUsers: true,
                          });
                        }}
                      />
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
                {getFieldDecorator('level', {
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
                (this.state.generationCode === '2' || this.state.generationCode === '3') && <FormItem className="line-item" label="区">
                  {getFieldDecorator('area', {
                    rules: [{ required: true, message: '请选择区!' }],
                  })(
                    <Select
                      placeholder="请选择区"
                    >
                      {
                        this.state.generationList.map((item) => {
                          return <Option value={item.key} key={item.key}>{item.generation}</Option>;
                        })
                      }
                    </Select>,
                  )}
                </FormItem>
              }
              {
                this.state.generationCode === '3' && <FormItem className="line-item" label="班">
                  {getFieldDecorator('class', {
                    rules: [{ required: true, message: '请选择班!' }],
                  })(
                    <Select
                      placeholder="请选择班"
                    >
                      {
                        this.state.generationList.map((item) => {
                          return <Option value={item.key} key={item.key}>{item.generation}</Option>;
                        })
                      }
                    </Select>,
                  )}
                </FormItem>
              }

              {
                this.state.generationCode === '1' &&
                <FormItem hasFeedback className="line-item" label="区名">
                  {getFieldDecorator('areaName', {
                    rules: [{ required: true, message: '请输入区' }],
                  })(
                    <Input placeholder="请填写区名" type="text" />,
                  )}
                </FormItem>
              }
              {
                this.state.generationCode === '2' &&
                <FormItem hasFeedback className="line-item" label="班名">
                  {getFieldDecorator('className', {
                    rules: [{ required: true, message: '请输入班名' }],
                  })(
                    <Input placeholder="请填写班名" type="text" />,
                  )}
                </FormItem>
              }
              {
                this.state.generationCode === '3' &&
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
