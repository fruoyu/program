import { notifyError, notifySuccess } from '../services/app.js';
import { ChangePictureDetails } from '../services/popup';

export default {
  namespace: 'popup',
  state: {
    pictureDetails: [],
    passWord: '',
  },
  effects: {
    *getPictureDetails({ payload, callback }, { call, put }) {
      const { data } = yield call(ChangePictureDetails, payload);
      if (data.result) {
        yield put({
          type: 'changePictureDetails',
          payload: { ...payload },
        });
        callback && callback(data);
      } else {
        notifyError(data.errMsg);
      }
    },
    *getAudioResultApi({ payload, callback }, { call, put }) {
      const { data } = yield call(Login, payload);
      // yield put({
      //   type: 'changeLoginMsg',
      //   payload: data,
      // });
      if (callback) callback(data);
    },
  },
  reducers: {
    changePictureDetails(state, { payload }) {
      return { ...state, pictureDetails: payload.result };
    },
    changeLoginMsg(state, { payload }) {
      return { ...state, userName: payload.userName };
    },
  },
};
