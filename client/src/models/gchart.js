import { queryDatasets, queryDataset } from '@/services/dataset';
import { convertDataset } from '@/utils/dataset';

export default {
  namespace: 'gchart',

  state: {
    list: [],
    grammar: { facat: null, coordination: null, geom: { Geom1: {} } },
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
    *updateSelected({ payload }, { put }) {
      yield put({
        type: 'updateDataset',
        payload: payload,
      });
    },
    *facatUpdate({ payload }, { put }) {
      yield put({
        type: 'updatefacat',
        payload,
      });
    },
    *coordUpdate({ payload }, { put }) {
      yield put({
        type: 'updateCoord',
        payload,
      });
    },
    *geomUpdate({ payload }, { put }) {
      yield put({
        type: 'updateGeom',
        payload,
      });
    },
    *geomDelete({ payload }, { put }) {
      yield put({
        type: 'deleteGeom',
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

      return {
        ...state,
        currentDataset: convertedDataset,
        grammar: { facat: null, coordination: null, geom: { Geom_0: {} } },
      };
    },
    updateDataset(state, action) {
      return {
        ...state,
        currentDataset: action.payload,
      };
    },
    updatefacat(state, action) {
      state.grammar.facat = action.payload;
      return {
        ...state,
      };
    },
    updateCoord(state, action) {
      state.grammar.coordination = action.payload;
      return {
        ...state,
      };
    },
    updateGeom(state, action) {
      const geomKey = action.payload.key;
      state.grammar.geom[geomKey] = { ...state.grammar.geom[geomKey], ...action.payload.value };
      return {
        ...state,
      };
    },
    deleteGeom(state, action) {
      delete state.grammar.geom[action.payload];
      return {
        ...state,
      };
    },
  },
};
