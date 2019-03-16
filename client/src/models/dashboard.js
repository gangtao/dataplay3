import { listDashboards, queryDashboard, createDashboard, deleteDashboard } from '@/services/dashboard';
import { runDatasetQuery } from '@/services/dataset';
import { convertDataset } from '@/utils/dataset';

export default {
  namespace: 'dashboard',

  state: {
    dashboards: {}
  },

  effects: {
    *fetchAll(_, { call, put }) {
      const response = yield call(listDashboards);
      console.log('fetch all return');
      console.log(response);
      yield put({
        type: 'queryAll',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDashboard, payload);
      yield put({
        type: 'query',
        payload: response,
      });
    },
  },

  reducers: {
    queryAll(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    query(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
