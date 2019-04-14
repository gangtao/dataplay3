import { queryJobs, queryJob, createJob, deleteJob } from '@/services/automl';
import { queryDatasets, queryDataset } from '@/services/dataset';
import { getConfig } from '@/services/config';

export default {
  namespace: 'timeserials',

  state: {
    jobs: [],
    view: 'list', // 'create' | 'detail' | 'predict' | 'list'
    selectedJob: {},
    datasetList: [],
    selectedDataset: {},
    createdJob: null,
    config: {},
  },

  effects: {
    *fetchJobs(_, { call, put }) {
      const payload = { type: 'TimeSerialsForecastsJob' };
      const response = yield call(queryJobs, payload);
      yield put({
        type: 'listJobs',
        payload: response,
      });
    },
    *fetchConfig(_, { call, put }) {
      const response = yield call(getConfig, 'mljob');
      yield put({
        type: 'updateConfig',
        payload: response,
      });
    },
    *removeJob({ payload }, { call, put }) {
      yield call(deleteJob, payload);
      yield put({
        type: 'fetchJobs',
      });
    },
    *fetchDatasets(_, { call, put }) {
      const response = yield call(queryDatasets);
      yield put({
        type: 'listDatasets',
        payload: response,
      });
    },
    *fetchDataset({ payload }, { call, put }) {
      const response = yield call(queryDataset, payload);
      const dataset = {};
      dataset.name = payload;
      dataset.cols = response.cols;
      yield put({
        type: 'updateSelectedDataset',
        payload: dataset,
      });
    },
    *createMLJob({ payload }, { call, put }) {
      const job = yield call(createJob, payload);
      yield put({
        type: 'updateCreatedJob',
        payload: job,
      });
      const response = yield call(queryJob, job.id);
      const updatePayload = {};
      updatePayload.job = response;
      updatePayload.view = 'detail';
      yield put({
        type: 'updateView',
        payload: updatePayload,
      });

      yield put({
        type: 'addOneJob',
        payload: response,
      });
    },
    *switchView({ payload }, { call, put }) {
      const job = yield call(queryJob, payload.jobId);
      const response = {};
      response.job = job;
      response.view = payload.view;

      yield put({
        type: 'updateView',
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
    createView(state) {
      return {
        ...state,
        view: 'create',
      };
    },
    listView(state) {
      return {
        ...state,
        view: 'list',
      };
    },
    updateView(state, action) {
      return {
        ...state,
        view: action.payload.view,
        selectedJob: action.payload.job,
      };
    },
    listDatasets(state, action) {
      return {
        ...state,
        datasetList: action.payload,
      };
    },
    updateSelectedDataset(state, action) {
      return {
        ...state,
        selectedDataset: action.payload,
      };
    },
    updateCreatedJob(state, action) {
      return {
        ...state,
        createdJob: action.payload,
      };
    },
    addOneJob(state, action) {
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
    },
    updateConfig(state, action) {
      return {
        ...state,
        config: action.payload,
      };
    },
  },
};
