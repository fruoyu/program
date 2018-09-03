import dva from 'dva';
import { message, notification } from 'antd';
import {
  delCookie,
} from './utils/cookie';
import './index.less';
import { useRouterHistory, browserHistory } from 'dva/router';
import { createHashHistory } from 'history';

notification.config({
  top: 80,
});
message.config({
  top: 80,
});

// 1. Initialize
const app = dva({
  // history: browserHistory,
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
  onError(e) { /* Global exception handler scope is dva framework only*/
    // console.error('Uncaught in dva: \n', e);
    if (e.response) {
      const { status, statusText } = e.response;
      if (status === 504) {
        message.error(`Server error ${status}, ${statusText}, please try again later.`, 2);
      }
    }
    /* if (window.location.port === '9090') {
      message.error(`Uncaught in dva: \n${e}`, 2);
    }*/
  },
  onReducer: r => (state, action) => {
    const newState = r(state, action);
    // 'login/logout' 为 models 目录文件中 effect 中的方法名
    if (action.type === 'login/loginOutSuccess') {
      // 登出删除token
      delCookie('token');
      return {
        login: {},
        history: {},
        popup: {},
        clientList: {},
        routing: { locationBeforeTransitions: null },
      };
    }
    return newState;
  },
});

window.app = app;

// 2. Plugins
// app.use({});

// 3. Model

app.model(require('./models/login'));
app.model(require('./models/history'));
app.model(require('./models/popup'));
app.model(require('./models/clientList'));
app.model(require('./models/userList'));
app.model(require('./models/structure'));

// 4. Router
app.router(require('./routerConfig'));

// 5. Start
app.start('#root');

