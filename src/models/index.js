import { getLoginMsg } from '../services/home';
export default {
  namespace: 'index',
  state: {
    defaultSelectedKeys: [],
    defaultOpenKeysl: [],
  },
  effects: {
    *changeRouterMsg({ payload, callback }, { call, put }) {
      yield put({
        type: 'RouterMsg',
        payload: { ...payload },
      });
    },
  },
  reducers: {
    RouterMsg(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
