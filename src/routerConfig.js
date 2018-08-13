import React from 'react';
import { Router, Route } from 'dva/router';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
// 路由页面
import App from './routes/App';
import Login from './routes/Login';
import Home from './routes/Home';
import Main from './routes/Main';
import Table from './routes/Table';
import Index from './routes/Index';


// 整体路由配置
function routerConfig({ history }) {
  return (
    <LocaleProvider locale={enUS}>
      <Router history={history}>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/index" component={Index}>
          <Route path="/index/home" component={Home} />
          <Route path="/index/main" component={Main} />
          <Route path="/index/table" component={Table} />
        </Route>
      </Router>
    </LocaleProvider>
  );
}

export default routerConfig;
