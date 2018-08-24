import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { MainWrapper } from '../../components';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    return (
      <MainWrapper>
        {this.props.children}
      </MainWrapper>
    );
  }
}
export default connect(({ home }) => ({ home }))(App);
