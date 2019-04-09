import { queryDatasets, queryDataset, deleteDataset } from '@/services/dataset';
import { convertDataset } from '@/utils/dataset';

export default {
  namespace: 'dataset',

  state: {
    list: [], // list of datasets id
    currentDataset: {}, // current selected dataset
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
      const responseWithName = { ...response, ...{ name: payload } };
      yield put({
        type: 'getDataset',
        payload: responseWithName,
      });
    },
    *deleteSelected({ payload }, { call, put }) {
      const response = yield call(deleteDataset, payload);
      yield put({
        type: 'deleteDataset',
        payload,
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
      if (action.payload.name) {
        convertedDataset.name = action.payload.name;
      }
      return {
        ...state,
        currentDataset: convertedDataset,
      };
    },
    updateSelected(state, action) {
      return {
        ...state,
        currentDataset: action.payload,
      };
    },
    deleteDataset(state, action) {
      const new_list = state.list.filter(function(value, index, arr) {
        return value.id !== action.payload;
      });
      return {
        ...state,
        list: new_list,
      };
    },
  },
};
