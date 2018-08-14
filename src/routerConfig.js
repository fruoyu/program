import React from 'react';
import { Router, Route } from 'dva/router';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
// 路由页面
import App from './routes/App';
import Login from './routes/Login';
import History from './routes/History';


// 整体路由
function routerConfig({ history }) {
  return (
    <LocaleProvider locale={enUS}>
      <Router history={history}>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/history" component={History} />
      </Router>
    </LocaleProvider>
  );
}

export default routerConfig;
