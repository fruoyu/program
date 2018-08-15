// import { notifyError, notifySuccess } from '../services/app.js';
import { Login } from '../services/login';

export default {
  namespace: 'login',
  state: {
    userName: '',
    passWord: '',
  },
  effects: {
    *savePassword({ payload, callback }, { call, put }) {
      yield put({
        type: 'changePassword',
        payload: { ...payload },
      });
    },
    *saveLoginMsg({ payload, callback }, { call, put }) {
      const { data } = yield call(Login, payload);
      if (callback) callback();
      yield put({
        type: 'changeLoginMsg',
        payload: data,
      });
    },
  },
  reducers: {
    changePassword(state, { payload }) {
      return { ...state, passWord: payload.passWord };
    },
    changeLoginMsg(state, { payload }) {
      return { ...state, userName: payload.userName };
    },
  },
};
