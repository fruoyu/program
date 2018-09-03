import { notifyError, notifySuccess } from '../services/app.js';
import { changeOriginalList, changeFilesListByid, changeFileResultApi, editItemLeft, editItem, KeyEdit } from '../services/popup';

export default {
  namespace: 'popup',
  state: {
    originalList: {},
    filesList: [],
    fileResult: {},
    templist: [
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_CHILD',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_AGE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_SEX',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_MERRIGE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_JOB',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CONSUME_HOUSE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CONSUME_CAR',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'SOCIAL_SECURITY',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'COMMERCIAL_INSURANCE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'INSURANCE_PURCHASER',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'INVESTMENT_TYPE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'INVESTMENT_PURCHASER',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'INVESTMENT_RATIO',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'INVESTMENT_DURATION',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'RISK_PREFERENCE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_HOBBY',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_ADMIRE',
      },
    ],
    keylist: [
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_CHILD',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_AGE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_SEX',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_MERRIGE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_JOB',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CONSUME_HOUSE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CONSUME_CAR',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'SOCIAL_SECURITY',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'COMMERCIAL_INSURANCE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'INSURANCE_PURCHASER',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'INVESTMENT_TYPE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'INVESTMENT_PURCHASER',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'INVESTMENT_RATIO',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'INVESTMENT_DURATION',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'RISK_PREFERENCE',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_HOBBY',
      },
      {
        context: '',
        creat_time: '',
        kehuName: '',
        phonenum: '',
        status: '',
        taskid: '',
        type: 'CUSTOMER_ADMIRE',
      },
    ],
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
        callback && callback(data);
      } else {
        notifyError(data.errMsg);
      }
    },
    *editItem({ payload, callback }, { call, put }) {
      const { data } = yield call(editItem, payload);
      if (data.result) {
        callback && callback(data);
      } else {
        notifyError(data.errMsg);
      }
    },
    *KeyEdit({ payload, callback }, { call, put }) {
      const { data } = yield call(KeyEdit, payload);
      if (data.result) {
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
      let tempArr = [];
      if (payload.result.keylist.length != 0) {
        state.keylist.map((item, index) => {
          payload.result.keylist.map((keylistItem, keylistIndex) => {
            if (item.type == keylistItem.type) {
              state.keylist[index] = keylistItem;
            } else {
              state.keylist[index] = {
                context: '',
                creat_time: '',
                kehuName: '',
                phonenum: '',
                status: '',
                taskid: '',
                type: item.type,
              };
            }
          });
        });
        tempArr = state.keylist;
      } else {
        tempArr = state.templist;
      }
      payload.result.keylist = tempArr;
      return { ...state, fileResult: payload.result };
    },
    saveKeylistForm(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
