import { Table, Tooltip } from 'antd';
import React from "react";

const DataList = (props) => {
  const { dataSource } = props;
  const columns = [{
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
    title: '创建日期',
    dataIndex: 'updateTime',
    key: 'updateTime',
    render: text => <div className="cellWrap">{text}</div>,
  }, {
    title: '所属销售',
    dataIndex: 'belong',
    key: 'belong',
    render: text => <div className="cellWrap">{text}</div>,
  }, {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => <div className="cellWrap">
      <Tooltip placement="bottom" title="编辑">
        <span className='iconfont icon-biaozhugongju' />
      </Tooltip>
      <Tooltip placement="bottom" title="删除">
        <span className='iconfont icon-shanchu' />
      </Tooltip>
      <Tooltip placement="bottom" title="画像">
        <span className='iconfont icon-huaxiang' />
      </Tooltip>
    </div>,
  }];

  return (
    <div className='clientListWrap'>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination = {
          {
            showQuickJumper:true,
            pageSize:3,
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

export default DataList;
