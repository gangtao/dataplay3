import { listDashboards, queryDashboard, createDashboard, deleteDashboard } from '@/services/dashboard';
import { queryDataset, runDatasetQuery } from '@/services/dataset';
import { convertDataset } from '@/utils/dataset';

export default {
  namespace: 'dashboard',

  state: {
    dashboards: {}
  },

  effects: {
    *fetchAll(_, { call, put }) {
      const response = yield call(listDashboards);
      yield put({
        type: 'queryAll',
        payload: response,
      });

      for( const key in response ){
        const dashboardObj = response[key];
        const { dataset, queryType, query } = dashboardObj;
        if ( !queryType ) {
          const queryResponse = yield call(queryDataset, dataset);
          const convertedDataset = convertDataset(queryResponse);
          dashboardObj = {...dashboardObj, ...convertedDataset};
          console.log(dashboardObj);
        } else {
          const payload = {...dashboardObj};
          const queryResponse = yield call(runDatasetQuery, payload);
          const convertedDataset = convertDataset(queryResponse);
          dashboardObj = {...dashboardObj, ...convertedDataset};
          console.log(dashboardObj);
        }
      }
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
