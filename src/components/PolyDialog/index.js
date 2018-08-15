import React, { Component } from 'react';
import { Button } from 'antd';
import './PolyDialog.less';

export default class PolyDialog extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      visible: false,
    };
  }
  componentWillMount() {
    this.setState({
      title: this.props.title,
      visible: this.props.visible,
    });
  }
  onClose= () => {
    this.setState({ visible: false });
    this.props.onClose && this.props.onClose();
  }
  onOk = () => {
    this.props.onOk && this.props.onOk();
    // this.onClose();
  }
  onCancel = () => {
    this.props.onCancel && this.props.onCancel();
    // this.onClose();
  }
  render() {
    const {
      onOk,
      onCancel,
    } = this.props;
    return (
      <div className="cover">
        <div className="main">
          {/* 标题 */}
          <p className="title">
            {this.state.title}
            <span onClick={this.onClose.bind(this)}>X</span>
          </p>
          {/* 主要内容区域 */}
          <section style={{ flex: 1 }}>
            {this.props.children}
          </section>
          <div className="buttonBox">
            {/* 保存 */}
            {
              onOk && <button onClick={this.onOk.bind(this)} style={{ flex: 1, height: 40 }}>保存</button>
            }
            {/* 取消 */}
            {
              onCancel && <button size="large" className="cancle" onClick={this.onCancel.bind(this)} style={{ flex: 1, height: 40 }}>取消</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

