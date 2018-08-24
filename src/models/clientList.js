import { notifyError, notifySuccess } from '../services/app.js';


export default {
  namespace: 'clientList',
  state: {
    endTime: '',
    startTime: '',
  },


  effects: {
    *getClientList({ payload, cb }, { call, put }) {
      const { data } = yield call(sGetClientList, payload);
      
      // FIXME: 数据请求结果判断
      if(data.result){
        yield put({
          type: 'getFileList',
          payload: data.result
        })
        if(cb) cb(data);
      } else {
        notifyError(data.errMsg)
      }
    }
  },

  reducers: {
    getFileList(state, { payload }) {
      return { ...state, mClientList: payload };
    },
  }
}