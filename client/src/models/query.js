import { runDatasetQuery } from '@/services/dataset';
import { convertDataset } from '@/utils/dataset';

export default {
  namespace: 'query',

  state: {
    savedQuery: {},
    currentQuery: {},
    currentQueryResult: { dataSource: null, columns: null },
    canSave: false,
    canExport: false,
  },

  effects: {
    *fetchQuery({ payload }, { call, put }) {
      const response = yield call(runDatasetQuery, payload);
      console.log('fetchQuery');
      console.log(payload);
      yield put({
        type: 'getQuery',
        payload: response,
      });
    },
    *addQueryResult({ payload }, { put }) {
      yield put({
        type: 'pushQuery',
        payload: payload,
      });
    },
  },

  reducers: {
    getQuery(state, action) {
      const convertedDataset = convertDataset(action.payload);

      return {
        ...state,
        currentQueryResult: convertedDataset,
        canSave: true,
      };
    },
    pushQuery(state, action) {
      return {
        ...state,
        savedQuery: { ...state.savedQuery, ...action.payload },
        canSave: false,
      };
    },
  },
};
