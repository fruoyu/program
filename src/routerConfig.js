import React from 'react';
import { Router, Route, Redirect } from 'dva/router';
// import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
// 路由页面
import App from './routes/App';
import Login from './routes/Login';
import History from './routes/History';
import UserPortrait from './routes/UserPortrait';
import Main from './routes/Main';
import Popup from './routes/Popup';
import NotFoundPage from './routes/NotFoundPage';
import ClientList from './routes/ClientList';
import UserList from './routes/UserList';
import Structure from './routes/StructureManage';


// 整体路由
function routerConfig({ history }) {
  return (
    <LocaleProvider>
      <Router history={history}>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/history" component={History} />
        <Route path="/userPortrait" component={UserPortrait} />
        <Route path="/main" component={Main} />
        <Route path="/popup"component={Popup} />
        <Route path="/clientList"component={ClientList} />
        <Route path="/userList"component={UserList} />
        <Route path="/structure"component={Structure} />
        {/* 404 */}
        <Route path="/404" component={NotFoundPage} />
        {/* 其他重定向到 404 */}
        <Redirect from="*" to="/404" />
      </Router>
    </LocaleProvider>
  );
}

export default routerConfig;
