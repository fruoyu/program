import { Table, Tooltip, Popconfirm } from 'antd';
import React from "react";


const DataList = (props) => {
  const { dataSource } = props;
  const columns = [{
    title: '姓名',
    dataIndex: 'customerName',
    key: 'customerName',
    render: text => <div className="cellWrap"><a href="javascript:;">{text}</a></div>,
  }, {
    title: '手机号',
    dataIndex: 'customerPhone',
    key: 'customerPhone',
    render: text => <div className="cellWrap">{text}</div>,
  }, {
    title: '星级',
    dataIndex: 'customerLevel',
    key: 'customerLevel',
    render: text => <div className="cellWrap">{text}</div>,
  }, {
    title: '五认关系',
    dataIndex: 'customerFive',
    key: 'customerFive',
    render: text => <div className="cellWrap">{text}</div>,
  }, {
    title: '创建日期',
    dataIndex: 'createTime',
    key: 'createTime',
    render: text => <div className="cellWrap">{text}</div>,
  }, {
    title: '所属销售',
    dataIndex: 'customerUser',
    key: 'customerUser',
    render: text => <div className="cellWrap">{text}</div>,
  }, {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: (text, record) => <div className="cellWrap">
      <Tooltip placement="bottom" title="编辑">
        <span className='iconfont icon-biaozhugongju' onClick={() => props.editCustomerInfo(record.key)} />
      </Tooltip>
      <Tooltip placement="bottom" title="删除">
        <span className='iconfont icon-shanchu' onClick={() => props.handleDel(record.key)} />
      </Tooltip>
      <Tooltip placement="bottom" title="画像">
        <span className='iconfont icon-huaxiang' onClick={()=> props.navigateTo(record.key)} />
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
            pageSize:10,
            total: props.total,
            onChange: props.handleChange,
            itemRender: (page, type, originaElement) => {
              // if(type === 'next') return <div class="containTotal"><a>next</a></div>
              return originaElement;
            },
            showTotal: (total, range) => {
              return `共${Math.ceil(total/10)}页`
            },
          }
        }
        />
    </div>

  )

}

export default DataList;
