import { queryDatasets, queryDataset } from '@/services/dataset';
import { convertDataset } from '@/utils/dataset';

export default {
  namespace: 'tchart',

  state: {
    list: [],
    grammar: {},
    currentDataset: {},
    chartType: null,
    feeds: {},
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
    *updateSelected({ payload }, { put }) {
      yield put({
        type: 'updateDataset',
        payload: payload,
      });
    },
    *updateType({ payload }, { put }) {
      yield put({
        type: 'updateChartType',
        payload: payload,
      });
    },
    *updateFeeds({ payload }, { put }) {
      yield put({
        type: 'updateChartFeeds',
        payload: payload,
      });
    },
    *updateGrammar({ payload }, { put }) {
      yield put({
        type: 'updateChartGrammar',
        payload: payload,
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
    updateDataset(state, action) {
      return {
        ...state,
        currentDataset: action.payload,
      };
    },
    updateChartType(state, action) {
      return {
        ...state,
        chartType: action.payload,
      };
    },
    updateChartFeeds(state, action) {
      return {
        ...state,
        feeds: {
          ...state.feeds,
          ...action.payload,
        },
      };
    },
    updateChartGrammar(state, action) {
      return {
        ...state,
        grammar: action.payload,
      };
    },
  },
};
