import { notifyError, notifySuccess } from '../services/app.js';
import { changeAssignRolesList, deleteAssignRoles, changeDepartmentName, addStructure } from '../services/structure';

export default {
  namespace: 'structure',
  state: {
    assignRolesList: [],
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
    *addStructure({ payload, callback }, { call, put }) {
      const { data } = yield call(addStructure, payload);
      if (data.status === 100) {
        if (callback) callback(data);
      } else {
        notifyError(data.message);
      }
    },
  },
  reducers: {
    changeAssignRolesList(state, { payload }) {
      return { ...state, assignRolesList: payload.data };
    },
  },
};
