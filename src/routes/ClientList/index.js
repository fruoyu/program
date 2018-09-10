import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { Modal } from 'antd';
import $ from 'jquery';
import { CommonHeader } from '../../components';
import DataList from './DataList';
import PopClient from './popClient';
import { verify } from '../../utils/cookie';

import './clientList.less';
import '../../assets/iconfont/iconfont.css';
import CommonFilter from "../../components/CommonFilter";

const confirm = Modal.confirm;

class ClientList extends Component {
  constructor(props){
    super(props);

    this.state = {
      flag: true,
      searchThing:'',
      name: '',
      endTime: '',
      startTime: '',
      userName: '',
      pageNum: 1, // 当前页数
      pageSize: 10, // 请求数
      popClientShow: false,
      dataSource: [],
      clientData: {},
      total: 0,
      arrArea: []
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
        // this.setPaginationTotalNum();
      });
    });

  }

  /**
   * 获取客户列表信息
   */
  onGetClientList = () => {
    const [area='', classc='', groupc=''] = this.state.arrArea;
    this.props.dispatch({
      type: 'clientList/getClientList',
      payload: {
        area, groupc, classc,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        userName: this.state.userName,
        whatPage: this.state.pageNum,
        customerType: this.state.searchThing,
      },
      cb: (data) => {
        const { result, pageCount: total } = data.data;
        let dataSource = [];
        if(result) {
          result.map((itm)=>{
            dataSource.push({ key:itm.customerId,
              customerName:itm.customerName,
              customerPhone:itm.customerPhone,
              customerLevel:itm.customerLevel,
              customerFive:itm.customerFive,
              customerUser:itm.customerUser,
              createTime:itm.createTime });
          });
        } else { dataSource.length=0;}
        this.setState({
          total,
          dataSource
        });
      }
    })
  }

  // 日历操作
  onChangeFn = (date, dateString) => {
    this.setState({
      endTime: dateString[1],
      pageNum: 1,
      startTime: dateString[0]
    },()=>{
      this.onGetClientList();
    });
  }
  // 级联下拉菜单
  onSelectChange = (val, d) => {
    this.setState({
      arrArea: val
    },()=>this.onGetClientList())
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
    this.setState({pageNum: 1},()=>{
      this.onGetClientList();
    })
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
  showPopWin = () => {
    if(!this.state.popClientShow) {
      this.setState({
        popClientShow: true,
        clientData: {edit: false}
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
    confirm({
      title: '确定删除该客户吗?',
      onOk: () => {
        this.props.dispatch({
          type: 'clientList/deleteClient',
          payload:{
            customerId: key
          },
          cb: ()=>{
            this.onGetClientList();
          }
        })
      },
      onCancel() {},
    });
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
          clientData:{edit: true, ...cdata},
          popClientShow: true
        })
      }
    })
  }

  handleChange = (page) => {
    this.setState({ pageNum: page },() => {
      this.onGetClientList();
    })
  }
  // 重置
  reloadFn() {
    const {
      searchThing,
      startTime,
      endTime,
      arrArea,
    } = this.state;

    const a = [
      searchThing,
      startTime,
      endTime,
      arrArea,
      ].some((el)=>{
        return el.length>0
      });
    if (!a) return;

    this.setState({
      searchThing:'',
      startTime:'',
      endTime:'',
      arrArea:[],
      flag:false
    }, () => {
      this.setState({flag: true})
      this.onGetClientList();
    });
  }

  render() {
    return (
      <div className="bootContent historyContent clientCotent" >
        <Scrollbars style={{ flex: 1 }} autoHide>

          {/* 头部信息 */}
          <CommonHeader title="客户列表" isMain customer isUserPort home />
          <div id="content">
          {
            this.state.flag && <CommonFilter
              searchTitle="客户姓名/客户电话"
              state={this.state}
              upDataState={::this.upDataState}
              sendRequest={::this.onGetClientList}
              onSelectChange={::this.onSelectChange}
              onChangeFn={::this.onChangeFn}
              reloadFn={::this.reloadFn}
            />
          }
            <div className='btn-newClient'><a className='btn' onClick={this.showPopWin}>新建客户</a></div>
          {/* 列表内容部分 */}
            {
              this.state.dataSource.length > 0 && <DataList
                dataSource={this.state.dataSource}
                handleDel={this.handleDel}
                handleChange={this.handleChange}
                total={this.state.total}
                editCustomerInfo={this.editCustomerInfo}
                navigateTo={this.navigateTo}
              />
            }
          </div>
        </Scrollbars>
        {this.state.popClientShow && <PopClient
          clientData={this.state.clientData && this.state.clientData}
          onCloseWin = { this.onCloseWin }
          onGetClientList={this.onGetClientList}
         /> }

      </div>


    )
  }

}

export default connect(({ clientList, userList }) => ({ clientList, userList }))(ClientList);
