import { notifyError } from '../services/app.js';
import { getUserList, deleteUser } from '../services/userList';

export default {
  namespace: 'userList',
  state: {
    userList: [],
  },
  effects: {
    *getUserList({ payload, callback }, { call, put }) {
      const { data } = yield call(getUserList, payload);
      if (data.status === 100) {
        yield put({
          type: 'changeUserList',
          payload: data.data,
        });
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
    *deleteUser({ payload, callback }, { call, put }) {
      const { data } = yield call(deleteUser, payload);
      if (data.status === 100) {
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
    *revisePwd({ payload, callback }, { call, put }) {
      const { data } = yield call(deleteUser, payload);
      if (data.status === 100) {
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
  },

  reducers: {
    changeUserList(state, { payload }) {
      return { ...state, userList: payload.userInfo};
    },
  },
};
