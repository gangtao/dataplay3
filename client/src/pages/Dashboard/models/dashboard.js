import { listDashboards, deleteDashboard } from '@/services/dashboard';
import { queryDataset, runDatasetQuery } from '@/services/dataset';
import convertDataset from '@/utils/dataset';

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

      const keys = Object.keys(response);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        let dashboardObj = response[key];
        const { dataset, type } = dashboardObj;
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
      yield call(deleteDashboard, payload);
      // TODO: handle rest error
      yield put({
        type: 'delete',
        payload,
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
    maximizeSelected(state, action) {
      return {
        ...state,
        maximize: action.payload,
      };
    },
  },
};
