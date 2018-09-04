import { notifyError, notifySuccess } from '../services/app.js';
import { changeAssignRolesList, deleteAssignRoles, changeDepartmentName, searchUsers, distributionUsers, addStructure, queryAreaClassCons } from '../services/structure';

export default {
  namespace: 'structure',
  state: {
    assignRolesList: [],
    ownedUsers: [],
    notOwnedUsers: [],
  },
  effects: {
    *getAssignRolesList({ payload, callback }, { call, put }) {
      const { data } = yield call(changeAssignRolesList, payload);
      if (data.status === 100) {
        yield put({
          type: 'changeAssignRolesList',
          payload: { ...data },
        });
        callback && callback(data);
      } else {
        notifyError(data.errMsg);
      }
    },
    *deleteAssignRoles({ payload, callback }, { call, put }) {
      const { data } = yield call(deleteAssignRoles, payload);
      if (data.status === 100) {
        callback && callback()
      } else {
        notifyError(data.message);
      }
    },
    *changeDepartmentName({ payload, callback }, { call, put }) {
      const { data } = yield call(changeDepartmentName, payload);
      if (data.status === 100) {
        callback && callback(data);
      } else {
        notifyError(data.message);
      }
    },
    *searchUsers({ payload, callback }, { call, put }) {
      const { data } = yield call(searchUsers, payload);
      if (data.status === 100) {
        if (payload.whetherBind == '0') {
          yield put({
            type: 'changeOwnedUsers',
            payload: { ...data },
          });
        } else {
          yield put({
            type: 'changeNotOwnedUsers',
            payload: { ...data },
          });
        }
        callback && callback();
      } else {
        notifyError(data.message);
      }
    },
    *distributionUsers({ payload, callback }, { call, put }) {
      const { data } = yield call(distributionUsers, payload);
      if (data.status === 100) {
        callback && callback();
      } else {
        notifyError(data.message);
      }
    },
    *addStructure({ payload, callback }, { call, put }) {
      const { data } = yield call(addStructure, payload);
      if (data.status === 100) {
        if (callback) callback(data);
      } else {
        notifyError(data.message);
      }
    },
    *queryAreaClassCons({ payload, callback }, { call, put }) {
      const { data } = yield call(queryAreaClassCons);
      if (data.status === 100) {
        yield put({
          type: 'changeAreaClassCons',
          payload: data.data,
        });
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
  },
  reducers: {
    changeAssignRolesList(state, { payload }) {
      return { ...state, assignRolesList: payload.data, count: payload.count };
    },
    changeOwnedUsers(state, { payload }) {
      return { ...state, ownedUsers: payload.data };
    },
    changeNotOwnedUsers(state, { payload }) {
      return { ...state, notOwnedUsers: payload.data };
    },
    saveOwnedUsers(state, { payload }) {
      return { ...state, ...payload };
    },
    changeAreaClassCons(state, { payload }) {
      return { ...state, AreaClassConsList: payload.area };
    },
  },
};
