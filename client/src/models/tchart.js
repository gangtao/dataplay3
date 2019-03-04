import { queryDatasets, queryDataset } from '@/services/dataset';

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
      const convertedDataset = {};
      if (action.payload) {
        let dataSource = [];
        let columns = [];

        // update source and columns based on dataset model
        if (action.payload.rows) {
          const { cols, rows } = action.payload;
          dataSource = rows.map(function(row) {
            const rowObj = {};
            for (let i = 0; i < cols.length; i += 1) {
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
  },
};
