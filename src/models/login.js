import { notifyError, notifySuccess } from '../services/app.js';
import { Login, LoginOut, ChangePwd } from '../services/login';
import { routerRedux } from 'dva/router';
import {
  setCookie,
  getCookie,
  sign,
  verify,
} from "../utils/cookie";
// import url from 'url';
// import qs from 'qs';
export default {
  namespace: 'login',
  state: {
    userName: '',
    password: '',
  },
  effects: {
    *saveLoginMsg({ payload, callback }, { call, put }) {
      const { data } = yield call(Login, payload);
      if (data) {
        const token = sign(payload);
        setCookie('token', token);
        yield put({
          type: 'changeLoginMsg',
          payload,
        });
        if (callback) callback();
      } else {
        notifyError('登录失败!');
      }
    },
    *loginOut({ payload, callback }, { call, put }) {
      const { data } = yield call(LoginOut);
      if (data) {
        if (callback) callback();
      } else {
        notifyError('退出失败!');
      }
    },
    *resolvePassword({ payload, callback }, { call, put }) {
      const { data } = yield call(ChangePwd, payload);
      if (data.result) {
        yield put({
          type: 'LoginMsg',
        });
        if (callback) callback();
      } else {
        notifyError(data.errMsg);
      }
    },
  },
  reducers: {
    changeLoginMsg(state, { payload }) {
      return { ...state, userName: payload.userName, password: payload.password };
    },
    LoginMsg(state) {
      return { ...state, userName: '', passWord: '' };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch(routerRedux.push('/login'));
        }
        if (getCookie('token')) {
          verify((err) => {
            if (err) { // cookie 超时了;
              if (pathname !== '/login') {
                dispatch({
                  type: 'login/loginOut',
                  payload: {},
                  callback: () => {
                    dispatch(routerRedux.push('/login'));
                  },
                });
              }
            }
          });
        } else if (pathname !== '/login') {
          location.href = '/login';
        }
      });
    },
  },
};
