import React, { Component } from 'react';
import { Pagination } from 'antd';
import './commonTable.less';

class CommonTable extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    const {
      tabHead,
      total,
      current
    } = this.props;
    const classNameList = ['item-title', 'item-author', 'item-composition', 'item-state', 'item-time', 'data'];
    return (
      <div className="content-body">
        <div className="content-main">
          {/* 表头 */}
          <div className="content-header" style={{ marginBottom: 0 }}>
            {
              tabHead.map((item, index) => {
                return (
                  <div key={index} className={classNameList[index]}>{item}</div>
                );
              })
            }
            {
              this.props.options && <div className="item-options">{this.props.options}</div>
            }
          </div>
          {/* 列表 */}
          <ul className="content-lists">{this.props.children}</ul>
        </div>

        {/* 分页器 */}
        <Pagination
          className="my-pagination"
          defaultCurrent={1} total={total} current={current} showQuickJumper style={{ marginTop: 60 }}
          onChange={(pageNumber) => {
            this.props.onChangePage(pageNumber);
          }}
        />
      </div>
    );
  }
}
export default CommonTable;
