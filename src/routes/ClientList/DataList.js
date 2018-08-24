import React, { Component, Fragment } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import $ from 'jquery';

class DataList extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: [{
        key: '1',
        name: '胡彦斌',
        phone: 12323132131,
        star: '三星',
        fiveStatus: '已认购',
        updateTime: '2018-08-21 13:35:24',
        belong: '张三'
      }, {
        key: '2',
        name: '胡彦祖',
        phone: 214135125151,
        star: '四星',
        fiveStatus: '未认购',
        updateTime: '2018-08-21 13:35:24',
        belong: '张四'
      }, {
        key: '3',
        name: '胡彦祖1',
        phone: 214135125151,
        star: '四星',
        fiveStatus: '未认购',
        updateTime: '2018-08-21 13:35:24',
        belong: '张四'
      }, {
        key: '4',
        name: '胡彦祖2',
        phone: 2141351251512,
        star: '四星',
        fiveStatus: '未认购',
        updateTime: '2018-08-21 13:35:24',
        belong: '张四'
      }, {
        key: '5',
        name: '胡彦祖3',
        phone: 2141351251512,
        star: '四星',
        fiveStatus: '未认购',
        updateTime: '2018-08-21 13:35:24',
        belong: '张四'
      }],
      columns: [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <div className="cellWrap"><a href="javascript:;">{text}</a></div>,
      }, {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        render: text => <div className="cellWrap">{text}</div>,
      }, {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
        render: text => <div className="cellWrap">{text}</div>,
      }, {
        title: '五认关系',
        dataIndex: 'fiveStatus',
        key: 'fiveStatus',
        render: text => <div className="cellWrap">{text}</div>,
      }, {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: text => <div className="cellWrap">{text}</div>,
      }, {
        title: '所属销售',
        dataIndex: 'belong',
        key: 'belong',
        render: text => <div className="cellWrap">{text}</div>,
      }]
    }
  }
  componentDidMount(){
    this.setPaginationTotalNum();
  }

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
  
  render() {
    return (
      <div className='clientListWrap'>
        <Table 
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          pagination = {
            { 
              showQuickJumper:true, 
              pageSize:2, 
              itemRender: (page, type, originaElement) => {
                // if(type === 'next') return <div class="containTotal"><a>next</a></div>
                return originaElement;
              },
              showTotal: (total, range) => {
                return `共${Math.ceil(total/2)}页`
              },
            }
          }
          />
      </div>
      
    )
  }
}

export default DataList;
