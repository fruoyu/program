import { notifyError, notifySuccess } from '../services/app.js';
import { sGetClientList, sAddClient, sUpdateClient, sDelClient } from '../services/clientList';
import {ifToken} from "../utils/cookie";

export default {
  namespace: 'clientList',
  state: {
    customerData: {}
  },


  effects: {
    *getClientList({ payload, cb }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(sGetClientList, payload);
      if(data.status===100){
        yield put({
          type: 'getFileList',
          payload: data.result
        })
        if(cb) cb(data);
      } else if(data.status===0){
        if(cb) cb(data);
      } else {
        notifyError(data.message)
      }
    },
    *addClient({ payload, cb }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(sAddClient, payload);
      if(data.status===100){
        if(cb) cb(data);
      } else {
        notifyError(data.errMsg)
      }
    },
    *updateClient({ payload, cb }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(sUpdateClient, payload);

      if(data.status===100){
        if(cb) cb(data);
      } else {
        notifyError(data.errMsg)
      }
    },
    *deleteClient({ payload, cb }, { call, put }) {
      if (!ifToken()) return;
      const { data } = yield call(sDelClient, payload);
      if(data.status===100){
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
