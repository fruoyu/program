import { notifyError, notifySuccess } from '../services/app.js';
import { getFilesList, getName, getSingleData, getQueryKeyItem, deleteFiles, changeCutsom } from '../services/history';
import { ifToken } from '../utils/cookie';

export default {
  namespace: 'history',
  state: {
    filesList: [],
    nameList: [],
    singleData: [], // 单条录音数据
  },
  effects: {
    /* 录音列表 */
    * getFilesList({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(getFilesList, payload);
      if (data.data) {
        yield put({
          type: 'changeFilesList',
          payload: data.data,
        });
        if (callback) callback(data.data);
      } else {
        notifyError(data.errMsg);
      }
    },
    /* 模糊查询用户列表 */
    * getName({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(getName, payload);
      if (data.result) {
        yield put({
          type: 'changeName',
          payload: data.result,
        });
        if (callback) callback();
      } else {
        notifyError(data.errMsg);
      }
    },
    /* 单条录音id */
    * saveTaskId({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeTaskId',
        payload: payload.taskId,
      });
      if (callback) callback();
    },
    /* 单条录音请求 */
    * getSingleData({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(getSingleData, payload);
      if (data.result) {
        yield put({
          type: 'changeSingleData',
          payload: data.result,
        });
        if (callback) callback();
      } else {
        notifyError(data.errMsg);
      }
    },
    /* 单条画像信息请求*/
    * getQueryKeyItem({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(getQueryKeyItem, payload);
      if (data.status === 0) {
        yield put({
          type: 'changeQueryKeyItem',
          payload: data.data,
        });
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
    /* 删除单条录音*/
    * deleteFiles({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(deleteFiles, payload);
      if (data.status === 0) {
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
    // 绑定客户、面销时间
    * changeCutsom({ payload, callback }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(changeCutsom, payload);
      if (data.status === 0) {
        if (callback) callback();
      } else {
        notifyError(data.message);
      }
    },
  },
  reducers: {
    changeFilesList(state, { payload }) {
      // 数据分类处理
      /* let sortArr = [];
      payload.reslist.map((d) => {
        if (!sortArr.filter((item) =>
        item.createTime.split(' ')[0] === d.createTime.split(' ')[0]).length) {
          const alphaObj = {
            createTime: d.createTime.split(' ')[0],
          };
          const arr = payload.reslist.filter((item) =>
          item.createTime.split(' ')[0] === d.createTime.split(' ')[0]);
          alphaObj.list = arr;
          sortArr.unshift(alphaObj);
        }
        return sortArr;
      });*/
      return { ...state, filesList: payload.reslist, total: payload.total };
    },
    changeName(state, { payload }) {
      return { ...state, nameList: payload };
    },
    changeTaskId(state, { payload }) {
      return { ...state, taskId: payload };
    },
    changeSingleData(state, { payload }) {
      return { ...state, singleData: payload };
    },
    changeQueryKeyItem(state, { payload }) {
      return { ...state, keyItemData: payload };
    },
  },
};
