import { runDatasetQuery } from '@/services/dataset';

export default {
  namespace: 'query',

  state: {
    list: [],
    currentQuery: {},
    currentQueryResult: { data: null, columns:null},
  },

  effects: {
    *fetchQuery({ payload }, { call, put }) {
      const response = yield call(runDatasetQuery, payload);
      yield put({
        type: 'getQuery',
        payload: response,
      });
    },
  },

  reducers: {
    getQuery(state, action) {
      return {
        ...state,
        currentQueryResult: action.payload,
      };
    },
  },
};
