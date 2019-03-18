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
    maximize: undefined,
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
        const { dataset, type, query } = dashboardObj;
        const dashboardObjWithKey = {};
        if (!type) {
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
    *deleteSelected({ payload }, { call, put }) {
      const response = yield call(deleteDashboard, payload);
      //TODO: handle rest error
      yield put({
        type: 'delete',
        payload: payload,
      });
    },
    *maximizeSelected({ payload }, { call, put }) {
      yield put({
        type: 'maximize',
        payload: payload,
      });
    },
  },

  reducers: {
    update(state, action) {
      return {
        ...state,
        dashboards: { ...state.dashboards, ...action.payload },
      };
    },
    delete(state, action) {
      delete state.dashboards[action.payload];
      return {
        ...state,
        dashboards: { ...state.dashboards },
      };
    },
    maximize(state, action) {
      return {
        ...state,
        maximize: action.payload,
      };
    },
  },
};
