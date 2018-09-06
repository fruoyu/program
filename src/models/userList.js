import { notifyError } from '../services/app.js';
import { getUserList, deleteUser, revisePwd, addUser, updateUser, construction } from '../services/userList';
import { ifToken } from '../utils/cookie';
export default {
  namespace: 'userList',
  state: {
    userList: [],
  },
  effects: {
    // 用户列表
    *getUserList({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(getUserList, payload);
      if (data.status === 100) {
        yield put({
          type: 'changeUserList',
          payload: { userInfo: data.data.userInfo, userCounts: data.data.userCounts },
        });
        if (callback) callback();
      } else {
        yield put({
          type: 'changeUserList',
          payload: { userInfo: data.data.result, userCounts: 0 },
        });
        notifyError(data.message);
      }
    },
    // 用户删除
    *deleteUser({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(deleteUser, payload);
      if (data.status === 100) {
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
    // 重置密码
    *revisePwd({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(revisePwd, payload);
      if (data.status === 100) {
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
    // 新增用户
    *addUser({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(addUser, payload);
      if (data.status === 100) {
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
    // 修改用户
    *updateUser({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(updateUser, payload);
      if (data.status === 100) {
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
    // 部门结构
    *getConstruction({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(construction, payload);
      if (data.status === 100) {
        if (callback) callback(data.data.area);
        yield put({
          type: 'changeConstruction',
          payload: data.data,
        });
      } else {
        notifyError(data.message);
      }
    },
  },

  reducers: {
    changeUserList(state, { payload }) {
      return { ...state, userList: payload.userInfo, userCounts: payload.userCounts };
    },
    changeConstruction(state, { payload }) {
      return { ...state, constructionList: payload.area };
    },
  },
};
