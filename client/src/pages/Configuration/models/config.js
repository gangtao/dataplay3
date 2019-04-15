import { listConfigs, getConfig, saveConfig } from '@/services/config';

export default {
  namespace: 'config',

  state: {},

  effects: {
    *fetchAll(_, { call, put }) {
      const response = yield call(listConfigs);

      for (let i = 0; i < response.length; i += 1) {
        const domain = response[i];
        const domainResponse = yield call(getConfig, domain);
        const config = {};
        config[domain] = domainResponse;
        yield put({
          type: 'update',
          payload: config,
        });
      }
    },
    *updateOne({ payload }, { call, put }) {
      yield call(saveConfig, payload);
      yield put({
        type: 'updateValue',
        payload,
      });
    },
  },

  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateValue(state, action) {
      const { domain, value } = action.payload;
      state[domain] = value;
      return { ...state };
    },
  },
};
