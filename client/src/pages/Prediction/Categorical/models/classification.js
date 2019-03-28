import { queryJobs, queryJob, createJob, deleteJob } from '@/services/automl';

export default {
  namespace: 'classification',

  state: {
    jobs: [],
  },

  effects: {
    *fetchJobs({ _ }, { call, put }) {
      const payload = { type: 'AutoClassificationJob' };
      const response = yield call(queryJobs, payload);
      yield put({
        type: 'listJobs',
        payload: response,
      });
    },
  },

  reducers: {
    listJobs(state, action) {
      return {
        ...state,
        jobs: action.payload,
      };
    },
  },
};
