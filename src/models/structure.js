import { notifyError, notifySuccess } from '../services/app.js';
import { changeAssignRolesList, } from '../services/structure';

export default {
  namespace: 'structure',
  state: {
    
  },
  effects: {
    *getAssignRolesList({ payload, callback }, { call, put }) {
      const { data } = yield call(changeAssignRolesList, payload);
      if (data.result) {
        yield put({
          type: 'changeAssignRolesList',
          payload: { ...data },
        });
        callback && callback(data);
      } else {
        notifyError(data.errMsg);
      }
    },
  },
  reducers: {
    changeAssignRolesList(state, { payload }) {
      return { ...state, originalList: payload.result.result };
    },
  },
};
