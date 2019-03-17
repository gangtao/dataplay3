import {
  listDashboards,
  queryDashboard,
  createDashboard,
  deleteDashboard,
} from '@/services/dashboard';
import { queryDataset, runDatasetQuery } from '@/services/dataset';
import { convertDataset } from '@/utils/dataset';

export default {
  namespace: 'dashboard',

  state: {
    dashboards: {},
  },

  effects: {
    *fetchAll(_, { call, put }) {
      const response = yield call(listDashboards);
      yield put({
        type: 'queryAll',
        payload: response,
      });

      for (const key in response) {
        const dashboardObj = response[key];
        const { dataset, queryType, query } = dashboardObj;
        const dashboardObjWithKey = {};
        if (!queryType) {
          const queryResponse = yield call(queryDataset, dataset);
          const convertedDataset = convertDataset(queryResponse);
          dashboardObj = { ...dashboardObj, ...convertedDataset };
          dashboardObjWithKey[key] = dashboardObj;
        } else {
          const payload = { ...dashboardObj };
          const queryResponse = yield call(runDatasetQuery, payload);
          const convertedDataset = convertDataset(queryResponse);
          dashboardObj = { ...dashboardObj, ...convertedDataset };
          dashboardObjWithKey[key] = dashboardObj;
        }
        yield put({
          type: 'update',
          payload: dashboardObjWithKey,
        });
      }
    },
  },

  reducers: {
    update(state, action) {
      return {
        ...state,
        dashboards: { ...state.dashboards, ...action.payload },
      };
    },
  },
};
