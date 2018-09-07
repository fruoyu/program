import React, { Component } from 'react';
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
      style,
      className,
    } = this.props;
    const claN = className ? `${className} main` : 'main';
    return (
      <div className="cover">
        <div className={claN} style={style}>
          {/* 标题 */}
          <p className="title">
            <span className="iconfont icon-htmal5icon19 close" onClick={this.onClose.bind(this)} />
          </p>
          {/* 主要内容区域 */}
          <section style={{ flex: 1, overflow: 'hidden' }}>
            {this.props.children}
          </section>
          <div className="buttonBox">
            {/* 保存 */}
            {
              onOk && <button
                onClick={this.onOk.bind(this)} style={{ flex: 1, height: 40 }}
              >保存</button>
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

