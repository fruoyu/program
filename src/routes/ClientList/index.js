import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { Cascader, Menu, Dropdown, Icon } from 'antd';
import $ from 'jquery';

import { CommonHeader } from '../../components';
import DatePick from './DatePicker';
import DataList from './DataList';
import PopClient from './popClient';
import { verify } from '../../utils/cookie';

import './clientList.less';
import '../../assets/iconfont/iconfont.css';

const SubMenu = Menu.SubMenu;

class ClientList extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchInputVal:'',
      name: '',
      endTime: '',
      startTime: '',
      userName: '',
      pageNum: 1, // 当前页数
      pageSize: 10, // 请求数
      popClientShow: false,
      composition: '所属结构',
      compositionList: [
        {
          key: '1',
          area: 'A区',
        },
        {
          key: '2',
          area: 'B区',
        },
        {
          key: '3',
          area: 'C区',
          class: [
            {
              key: '1',
              class: 'A班',
            },
            {
              key: '2',
              class: 'B班',
              group: [
                {
                  key: '1',
                  group: 'A组',
                },
                {
                  key: '2',
                  group: 'B组',
                },
              ],
            },
          ],
        },
        {
          key: '4',
          area: 'D区',
          class: [
            {
              key: '1',
              class: 'A班',
            },
            {
              key: '2',
              class: 'B班',
            },
          ],
        },
      ],
      dataSource: [],
      clientData: {},
    };

    this.onGetClientList = this.onGetClientList.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.showPopWin = this.showPopWin.bind(this);
  }

  componentDidMount(){
    verify((err, decoded) => {
      if (err) return;
      const { userName } = decoded.data;
      this.setState({
        userName
      }, ()=>{
        this.onGetClientList();
        this.setPaginationTotalNum();
      });
    });
  }

  /**
   * 获取客户列表信息
   */
  onGetClientList = () => {
    this.props.dispatch({
      type: 'clientList/getClientList',
      payload: {
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        userName: this.state.userName,
        whatPage: this.state.pageNum,
        customerType: this.state.searchInputVal,
      },
      cb: (data) => {
        const { result } = data.data;
        let dataSource = [];
        if(result) {
          result.map((itm)=>{
            const { customerId, 
              customerName, 
              customerPhone, 
              customerLevel, 
              customerFive, 
              customerUser, 
              createTime } = itm;
            dataSource.push({ key:customerId, 
              customerName, 
              customerPhone, 
              customerLevel, 
              customerFive, 
              customerUser, 
              createTime });
          });
        } else { dataSource.length=0;}
        this.setState({
          dataSource
        });
      }
    })
  }

  // 日历操作
  onChangeFn = (date, dateString) => {
    this.setState({
      endTime: dateString[0],
      startTime: dateString[1]
    },()=>{this.onGetClientList()})
    
  }

  // 客户信息列表分页设置文字 ‘共*页’ 位置
  setPaginationTotalNum = () => {
    let aLi = $('.clientListWrap li'),
      tarLi = null,posLi = null;
    aLi.map((i, itm) => {
      let item = $(itm);
      if(item.hasClass('ant-pagination-next')) posLi = item;
      if(item.hasClass('ant-pagination-total-text')) tarLi = item;
    })
    tarLi.insertAfter(posLi);
  }

  onSearchClick = (ev) => {
    this.onGetClientList();
  }

  showPopWin = () => {
    if(!this.state.popClientShow) {
      this.setState({
        popClientShow: true
      })
    }
  }

  onCloseWin = () => {
    if(this.state.popClientShow) {
      this.setState({
        popClientShow: false
      })
    }
  }
  handleDel = (key) => {
    this.props.dispatch({
      type: 'clientList/deleteClient',
      payload:{
        customerId: key
      },
      cb: (data)=>{
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
      }
    })
  }

  navigateTo = (id) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/userPortrait',
      query: {
        customerId: id,
      },
    }));
  }

  editCustomerInfo = (id) => {
  
    this.props.dispatch({
      type: 'clientList/getClientList',
      payload: {
        startTime: '',
        endTime: '',
        userName: this.state.userName,
        whatPage: 1,
        customerType: '',
        customerId: id
      },
      cb: (data) => {
        const { result:[ cdata ] } = data.data;
        this.setState({
          clientData:{edit: true, ...cdata}
        },() => {
          this.showPopWin();
        })
      }
    })
  }

  render() {
    const menu = (
      <Menu
        className="composition-down-load"
        onClick={(item) => {
          const key = item.keyPath;
          const len = key.length;
          let str = ''
          if (len === 1) {
            str = `${this.state.compositionList[key[0] - 1].area}`;
          } else if (len === 2) {
            str = `${this.state.compositionList[key[1] - 1].area}/${this.state.compositionList[key[1] - 1].class[key[0] - 1].class}`;
          } else if (len === 3) {
            str = `${this.state.compositionList[key[2] - 1].area}/${this.state.compositionList[key[2] - 1].class[key[1] - 1].class}/${this.state.compositionList[key[2] - 1].class[key[1] - 1].group[key[0] - 1].group}`;
          }
          this.setState({
            composition: str,
          });
        }}
      >
        {
          this.state.compositionList.map((item) => {
            return (
             !item.class ? <Menu.Item key={item.key}>{item.area}</Menu.Item> :
             <SubMenu title={item.area} key={item.key}>
               {
                 item.class.map((content) => {
                   return (
                     !content.group ? <Menu.Item key={content.key}>{content.class}</Menu.Item> : (
                       <SubMenu title={content.class} key={content.key}>
                         {
                           content.group.map((title) => {
                             return (
                               <Menu.Item key={title.key}>{title.group}</Menu.Item>
                             );
                           })
                         }
                       </SubMenu>
                     )
                   );
                 })
               }
             </SubMenu>
            );
          })
        }
      </Menu>
    );
    return (
      <div className="bootContent historyContent clientCotent" >
        <Scrollbars style={{ flex: 1 }} autoHide>

          {/* 头部信息 */}
          <CommonHeader title="客户列表" isMain customer isUserPort />
          <div id="content">
            <div className="content-head">
              <div className="ch-top">

              {/* Filter part start */}
                <div className="search-input">
                  <input
                    type="text" placeholder="客户姓名/客户电话"
                    onChange={(e) => {
                      this.setState({
                        searchInputVal: e.target.value
                      });
                    }}
                  />
                  <span className="iconfont icon-qianwang" onClick={this.onSearchClick} />
                </div>

                {/* 下拉菜单 */}
                  {/* 所属结构 */}
                  <div className="composition click-item">
                    <Dropdown overlay={menu} trigger={['click']}>
                      <span className="ant-dropdown-link">
                        {this.state.composition}<Icon type="down" />
                      </span>
                    </Dropdown>
                  </div>
                {/* 日历 */}
                <DatePick onChangeFn={this.onChangeFn} />

              {/* Filter part end */}
              </div>
            </div>

                <div className='btn-newClient'><a className='btn' onClick={this.showPopWin}>新建客户</a></div>

          {/* 列表内容部分 */}
            <DataList dataSource={this.state.dataSource} 
            handleDel={this.handleDel} 
            editCustomerInfo={this.editCustomerInfo}
            navigateTo={this.navigateTo} />
          </div>
        </Scrollbars>
        {this.state.popClientShow && <PopClient
          clientData={this.state.clientData && this.state.clientData}
          onCloseWin = { this.onCloseWin }
         /> }
        
      </div>
                      
     
    )
  }

}

export default connect(({ clientList }) => ({ clientList }))(ClientList);
