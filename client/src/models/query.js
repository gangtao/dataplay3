import { runDatasetQuery } from '@/services/dataset';
import { convertDataset } from '@/utils/dataset';

export default {
  namespace: 'query',

  state: {
    savedQuery: {},
    currentQuery: {},
    currentQueryResult: { dataSource: null, columns: null },
    canSave: false,
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
      const convertedDataset = convertDataset(action.payload);

      return {
        ...state,
        currentQueryResult: convertedDataset,
        canSave: true,
      };
    },
    addQueryResult(state, action) {
      return {
        ...state,
        savedQuery: { ...state.savedQuery, ...action.payload },
        canSave: false,
      };
    },
    deleteQuery(state, action) {
      delete state.savedQuery[action.payload];
      return {
        ...state,
      };
    },
  },
};
