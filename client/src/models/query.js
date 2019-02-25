import { runDatasetQuery } from '@/services/dataset';

export default {
  namespace: 'query',

  state: {
    list: [],
    currentQuery: {},
    currentQueryResult: { dataSource: null, columns: null },
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
        currentQueryResult: convertedDataset,
      };
    },
  },
};
