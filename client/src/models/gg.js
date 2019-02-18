import { queryDatasets, queryDataset } from '@/services/dataset';

export default {
  namespace: 'gg',

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
    *facatUpdate({ payload }, { call, put }) {
      yield put({
        type: 'updatefacat',
        payload: payload,
      });
    },
    *coordUpdate({ payload }, { call, put }) {
      yield put({
        type: 'updateCoord',
        payload: payload,
      });
    },
    *geomUpdate({ payload }, { call, put }) {
      yield put({
        type: 'updateGeom',
        payload: payload,
      });
    },
    *geomDelete({ payload }, { call, put }) {
      yield put({
        type: 'deleteGeom',
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
      let convertedDataset = {};
      if (action.payload) {
        let dataSource = [];
        let columns = [];

        // update source and columns based on dataset model
        if (action.payload.rows) {
          const { cols, rows } = action.payload;
          dataSource = rows.map(function(row) {
            let rowObj = {};
            for (let i = 0; i < cols.length; i++) {
              rowObj[cols[i]] = row[i];
            }
            return rowObj;
          });
          columns = cols.map(col => {
            return {
              title: col,
              dataIndex: col,
              key: col,
            };
          });
        }

        convertedDataset.dataSource = dataSource;
        convertedDataset.columns = columns;
      }

      return {
        ...state,
        currentDataset: convertedDataset,
        grammar: { facat: null, coordination: null, geom: {} },
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
