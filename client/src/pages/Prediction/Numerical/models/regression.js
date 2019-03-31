import { queryJobs, queryJob, createJob, deleteJob } from '@/services/automl';
import { queryDatasets, queryDataset } from '@/services/dataset';

export default {
  namespace: 'regression',

  state: {
    jobs: [],
    view: 'list',
    selectedJob: {},
    datasetList: [],
    selectedDataset: {},
    createdJob: null,
  },

  effects: {
    *fetchJobs({ _ }, { call, put }) {
      const payload = { type: 'AutoRegressionJob' };
      const response = yield call(queryJobs, payload);
      yield put({
        type: 'listJobs',
        payload: response,
      });
    },
    *fetchJob({ payload }, { call, put }) {
      const response = yield call(queryJob, payload);
      //
    },
    *deleteJob({ payload }, { call, put }) {
      const response = yield call(deleteJob, payload);
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
      const jobId = yield call(createJob, payload);
      yield put({
        type: 'updateCreatedJob',
        payload: jobId,
      });
      const response = yield call(queryJob, jobId);
      yield put({
        type: 'detailView',
        payload: response,
      });
    },
    *switchDetailView({ payload }, { call, put }) {
      const response = yield call(queryJob, payload);
      yield put({
        type: 'detailView',
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
    createView(state, action) {
      return {
        ...state,
        view: 'create',
      };
    },
    listView(state, action) {
      return {
        ...state,
        view: 'list',
      };
    },
    detailView(state, action) {
      return {
        ...state,
        view: 'detail',
        selectedJob: action.payload,
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
  },
};
