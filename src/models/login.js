import { notifyError, notifySuccess } from '../services/app.js';
import { Login, LoginOut, ChangePwd } from '../services/login';

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
};
