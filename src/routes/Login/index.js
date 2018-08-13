import React, { Component } from 'react';
import { connect } from 'dva';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Animated from 'animated/lib/targets/react-dom';
import './login.less';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      items: ['hello', 'world', 'click', 'me'],
      transitionAppear: false,
      anim: new Animated.Value(0),
    };
  }
  handleClick = () => {
    const { anim } = this.state;
    anim.stopAnimation((value) => {
      Animated.spring(anim, {
        toValue: Math.round(value) + 2,
      }).start();
    });
  }
  handleRemove(i) {
    const newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({
      items: newItems,
    });
  }
  render() {
    const { anim } = this.state;

    const rotateDegree = anim.interpolate({
      inputRange: [0, 2],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <div>
        <button
          onMouseEnter={() => {
            this.setState({
              transitionAppear: true,
            });
          }}
        >
          展示</button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={this.state.transitionAppear}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {
            this.state.items.map((item, i) => {
              return (
                <div key={item} onClick={this.handleRemove.bind(this, i)}>
                  {item}
                </div>
              );
            })
          }
        </ReactCSSTransitionGroup>

        <div>
          <button onMouseEnter={this.handleClick} onMouseOut={this.handleClick}>向右翻转</button>
          <Animated.div
            style={{
              transform: [{
                rotateY: rotateDegree,
              }],
            }}
            className="preivew-wrapper"
          >
            <div style={{ width: 100, height: 100, background: 'red' }}></div>
          </Animated.div>
        </div>
      </div>
    );
  }

}

export default connect(({ login }) => ({ login }))(Login);
