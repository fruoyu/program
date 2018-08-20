import { notifyError, notifySuccess } from '../services/app.js';
import { getFilesList, getName, getSingleData } from '../services/history';

export default {
  namespace: 'history',
  state: {
    filesList: [],
    nameList: [],
    singleData: [], // 单条录音数据
  },
  effects: {
    /* 录音列表 */
    *getFilesList({ payload, callback }, { call, put }) {
      const { data } = yield call(getFilesList, payload);
      if (data.result) {
        yield put({
          type: 'changeFilesList',
          payload: data.result,
        });
        // if (callback) callback();
      } else {
        notifyError(data.errMsg);
      }
    },
    /* 模糊查询用户列表 */
    *getName({ payload, callback }, { call, put }) {
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
    *saveTaskId({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeTaskId',
        payload: payload.taskId,
      });
      if (callback) callback();
    },
    /* 单条录音请求 */
    *getSingleData({ payload, callback }, { call, put }) {
      const { data } = yield call(getSingleData, payload);
      console.log(data);
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
  },
  reducers: {
    changeFilesList(state, { payload }) {
      // 数据分类处理
      /*let sortArr = [];
      payload.reslist.map((d) => {
        if (!sortArr.filter((item) => item.createTime.split(' ')[0] === d.createTime.split(' ')[0]).length) {
          const alphaObj = {
            createTime: d.createTime.split(' ')[0],
          };
          const arr = payload.reslist.filter((item) => item.createTime.split(' ')[0] === d.createTime.split(' ')[0]);
          alphaObj.list = arr;
          sortArr.unshift(alphaObj);
        }
        return sortArr;
      });*/
      return { ...state, filesList: payload.reslist };
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
  },
};
