import React from 'react';
import { Router, Route } from 'dva/router';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
// 路由页面
import App from './routes/App';
import Login from './routes/Login';
import Main from './routes/Main';
import Popup from './routes/Popup';


// 整体路由配置
function routerConfig({ history }) {
  return (
    <LocaleProvider locale={enUS}>
      <Router history={history}>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/popup" component={Popup} />
      </Router>
    </LocaleProvider>
  );
}

export default routerConfig;
