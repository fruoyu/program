import React, { Component } from 'react';
import { connect } from 'dva';
import {
  PolyDialog,
} from '../../components';
import Highcharts from 'highcharts';
import './home.less';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      bool: false,
    };
  }
  componentDidMount() {
    const colors = ['#168fff'];
    Highcharts.getOptions().colors = Highcharts.map(colors, (color) => {
      return {
        radialGradient: { cx: 0.3, cy: -0.1, r: 2 },
        stops: [[0, color], [2, Highcharts.Color(color).brighten(14).get('rgb')], // darken
        ],
      };
    });
    // 折线图
    Highcharts.chart('container', {
      title: {
        text: '客户分析',
        align: 'left',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        categories: ['高层', '中层', '基层', '其他'], // x轴
      },
      yAxis: {
        title: '',
        tickPositions: [0, 100, 200, 300, 400, 500, 600], // 指定竖轴坐标点的值
      },
      series: [{ // 数值
        name: '人员',
        data: [150, 240, 405, 176],
      }],
    });
    // 柱状图
    Highcharts.chart('containerT', {
      chart: {
        type: 'column',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      title: {
        text: '上传录音信息分析',
        align: 'left',
      },
      xAxis: {
        categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      },
      yAxis: {
        title: null,
        tickPositions: [0, 100, 200, 300, 400, 500, 600], // 指定竖轴坐标点的值
      },
      series: [{
        name: '小张',
        data: [120, 190, 300, 380, 293, 409, 500, 222, 331, 129,240, 400],
      }],
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
        },
      },
    });
  }
  render() {
    return (
      <div className="bootContent">
        <div style={{ height: 170, display: 'flex', marginTop: 100 }}>
          <div style={{ width: 360, background: '#fff', marginRight: 10 }} onClick={() => { this.setState({ bool: true }); }}>我的客户</div>
          <div style={{ width: 360, background: '#fff', marginRight: 10 }}>我的录音</div>
          <div style={{ width: 360, background: '#fff' }}>我的存储空间</div>
        </div>
        <div className="containerBox">
          <div id="containerT" style={{ width: 730, marginRight: 10 }} />
          <div id="container" style={{ width: 360 }} />
        </div>

        {/* 弹框 */}
        {
          this.state.bool && <PolyDialog
            title="编辑框"
            visible={this.state.bool}
            onClose={() => {
              this.setState({ bool: false });
            }}
            onOk={() => {
              this.setState({ bool: false });
            }}
            onCancel={() => {
              this.setState({ bool: false });
            }}
          ></PolyDialog>
        }
      </div>
    );
  }
}

export default connect(({ home, index }) => ({ home, index }))(Home);
