import React, { Component } from 'react';
import { Pagination } from 'antd';

class CommonTable extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    const {
      filesList,
      tabHead,
    } = this.props;
    const classNameList = ['item-title', 'item-author', 'item-state', 'item-time', 'data'];
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
          </div>
          {/* 列表 */}
          <ul className="content-lists">{this.props.children}</ul>
        </div>

        {/* 分页器 */}
        {
          filesList.length > 0 && <Pagination
            className="my-pagination"
            defaultCurrent={1} total={20} showQuickJumper style={{ marginTop: 60 }}
            onChange={(pageNumber) => {
              this.props.onChangePage(pageNumber);
            }}
          />
        }
      </div>
    );
  }
}
export default CommonTable;
