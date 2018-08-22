import React, { Component } from 'react';

class NotRoundPage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="bootContent" style={{ background: '#fff' }}>
        <h1 style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>404 Not Found</h1>
      </div>
    );
  }
}
export default NotRoundPage;
