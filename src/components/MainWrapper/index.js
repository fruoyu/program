import React, { Component } from 'react';

class MainWrapper extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    return (
      <div style={{ flex: 1, display: 'flex' }}>
        {this.props.children}
      </div>
    );
  }
}
export default MainWrapper;
