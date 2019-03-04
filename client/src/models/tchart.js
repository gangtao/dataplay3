import { queryDatasets, queryDataset } from '@/services/dataset';
import { convertDataset } from '@/utils/dataset';

export default {
  namespace: 'tchart',

  state: {
    list: [],
    grammar: { facat: null, coordination: null, geom: { Geom_0: {} } },
    currentDataset: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryDatasets);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSelected({ payload }, { call, put }) {
      const response = yield call(queryDataset, payload);
      yield put({
        type: 'getDataset',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    getDataset(state, action) {
      // Convert the array datamodel to object data model
      const convertedDataset = convertDataset(action.payload);

      return {
        ...state,
        currentDataset: convertedDataset,
        grammar: { facat: null, coordination: null, geom: {} },
      };
    },
  },
};
