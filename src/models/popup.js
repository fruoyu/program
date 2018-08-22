import { notifyError, notifySuccess } from '../services/app.js';
import { changeOriginalList, changeFilesListByid, changeFileResultApi, editItemLeft } from '../services/popup';

export default {
  namespace: 'popup',
  state: {
    originalList: {},
    filesList: [],
    fileResult: [],
  },
  effects: {
    *getOriginalList({ payload, callback }, { call, put }) {
      const { data } = yield call(changeOriginalList, payload);
      if (data.result) {
        yield put({
          type: 'changeOriginalList',
          payload: { ...data },
        });
        callback && callback(data);
      } else {
        notifyError(data.errMsg);
      }
    },
    *getFilesListByid({ payload, callback }, { call, put }) {
      const { data } = yield call(changeFilesListByid, payload);
      if (data.result) {
        yield put({
          type: 'changeFilesListByid',
          payload: { ...data },
        });
        callback && callback(data);
      } else {
        notifyError(data.errMsg);
      }
    },
    *getFileResultApi({ payload, callback }, { call, put }) {
      const { data } = yield call(changeFileResultApi, payload);
      if (data.result) {
        yield put({
          type: 'changeFileResultApi',
          payload: { ...data },
        });
        callback && callback(data);
      } else {
        notifyError(data.errMsg);
      }
    },
    *editItemLeft({ payload, callback }, { call, put }) {
      const { data } = yield call(editItemLeft, payload);
      if (data.result) {
        yield put({
          payload: { ...data },
        });
        callback && callback(data);
      } else {
        notifyError(data.errMsg);
      }
    },
  },
  reducers: {
    changeOriginalList(state, { payload }) {
      return { ...state, originalList: payload.result.result };
    },
    changeFilesListByid(state, { payload }) {
      return { ...state, filesList: payload.result.reslist };
    },
    changeFileResultApi(state, { payload }) {
      return { ...state, fileResult: payload.result };
    },
  },
};
