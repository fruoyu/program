import React, { Component } from 'react';
import $ from 'jquery';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'dva';
import {
  CommonHeader,
  CommonTable,
} from '../../components';
import '../../assets/iconfont/iconfont.css';
import './structure.less';

class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structureList: [
        {
          name: 'fhshshs',
        },
        {
          name: 'fhshshs',
        },
        {
          name: 'fhshshs',
        },
        {
          name: 'fhshshs',
        },
        {
          name: 'fhshshs',
        },
        {
          name: 'fhshshs',
        },
      ]
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
      callback: (data) => {
        console.log(data);
      }
    })
  }

  render() {
    const tabHead = ['部门名称', '部门级别', '区', '班', '组', '操作']
    return (
      <div id='structure'>
        <CommonHeader title="结构管理" goback/>
        <div className='structure-box'>
          <div className='structure-header'>
            <text>头部</text>
          </div>
          <CommonTable
            filesList={this.state.structureList}
            tabHead={tabHead}
            onChangePage={(pageNumber) => {
              this.changePageNum(pageNumber);
            }}
          >
            {
              this.state.structureList.map((item, index) => (
                <li className="content-item" key={index}>
                  <div className="item-title">cgdx</div>
                  <div className="item-author">cgdx</div>
                  <div className="item-composition">cgdx</div>
                  <div className="item-state">cgdx</div>
                  <div className="item-time">cgdx</div>
                  <div className="data">
                    <span>修改</span>
                    <span>删除</span>
                    <span>分配用户</span>
                  </div>
                </li>
              ))
            }
          </CommonTable>
        </div>
      </div>
    )
  }
}
export default connect(({ structure }) => ({ structure }))(Structure);
