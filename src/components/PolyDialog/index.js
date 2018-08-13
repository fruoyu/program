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
    this.onClose();
  }
  onCancel = () => {
    this.props.onCancel && this.props.onCancel();
    this.onClose();
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
            <span onClick={this.onClose.bind(this)} style={{ cursor: 'pointer', fontSize: 20 }}>X</span>
          </p>
          {/* 主要内容区域 */}
          <section style={{ flex: 1 }}>
            {this.props.children}
          </section>


          <div className="buttonBox">
            {/* 保存 */}
            {
              onOk && <Button type="primary" size="large"onClick={this.onOk.bind(this)} style={{ marginRight: 10 }}>保存</Button>
            }
            {/* 取消 */}
            {
              onCancel && <Button type="danger" size="large" onClick={this.onCancel.bind(this)} style={{ marginLeft: 10 }}>取消</Button>
            }
          </div>
        </div>
      </div>
    );
  }
}

