import dva from 'dva';
import { message, notification } from 'antd';
import {
  delCookie,
  getCookie,
  verify,
} from './utils/cookie';
import './index.less';
import routes from './routes';
import {useRouterHistory, browserHistory, routerRedux} from 'dva/router';
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
  // history: useRouterHistory(createHashHistory)({ queryKey: false }),
  onError(e) { /* Global exception handler scope is dva framework only*/
    // console.error('Uncaught in dva: \n', e);
    if (e.response) {
      const { status, statusText } = e.response;
      message.error(`Server error ${status}, ${statusText}, please try again later.`, 2);
      /* if (status === 504) {
        message.error(`Server error ${status}, ${statusText}, please try again later.`, 2);
      } */
    }
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

