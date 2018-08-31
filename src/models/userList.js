import { notifyError } from '../services/app.js';
import { getUserList, deleteUser, revisePwd } from '../services/userList';
import {notifySuccess} from "../services/app";

export default {
  namespace: 'userList',
  state: {
    userList: [],
  },
  effects: {
    // 用户列表
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
    // 用户删除
    *deleteUser({ payload, callback }, { call, put }) {
      const { data } = yield call(deleteUser, payload);
      if (data.status === 100) {
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
    // 重置密码
    *revisePwd({ payload, callback }, { call, put }) {
      const { data } = yield call(revisePwd, payload);
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
