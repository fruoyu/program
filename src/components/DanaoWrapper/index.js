import React, { Component } from 'react';
import './danao.less';

class DanaoWrapper extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="danaoWrapper">
        {this.props.children}
      </div>
    );
  }
}
export default DanaoWrapper;
