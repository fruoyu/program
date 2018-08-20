import { notifyError, notifySuccess } from '../services/app.js';
import { Login, LoginOut, ChangePwd } from '../services/login';
import { routerRedux } from 'dva/router';
// import url from 'url';
// import qs from 'qs';
export default {
  namespace: 'login',
  state: {
    userName: '',
    passWord: '',
  },
  effects: {
    *saveLoginMsg({ payload, callback }, { call, put }) {
      const { data } = yield call(Login, payload);
      // yield put({
      //   type: 'changeLoginMsg',
      //   payload: data,
      // });
      if (callback) callback(data);
    },
    *loginOut({ payload, callback }, { call, put }) {
      const { data } = yield call(LoginOut);
      if (data) {
        yield put({
          type: 'LoginMsg',
        });
        if (callback) callback();
      } else {
        notifyError('退出失败!');
      }
    },
    *resolvePassword({ payload, callback }, { call, put }) {
      const { data } = yield call(ChangePwd, payload);
      console.log(data);// errMsg ,retCode
      if (callback) callback(data);
      if (data.result) {
        yield put({
          type: 'LoginMsg',
        });
      } else {
        notifyError(data.errMsg);
      }
    },
  },
  reducers: {
    changeLoginMsg(state, { payload }) {
      return { ...state, userName: payload.userName };
    },
    LoginMsg(state) {
      return { ...state, userName: '', passWord: '' };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // const { query } = url.parse(search);
        // const oPath = qs.parse(query)
        console.log(pathname);
        if (pathname === '/') {
          dispatch(routerRedux.push('/login'));
        }
      });
    },
  },
};
