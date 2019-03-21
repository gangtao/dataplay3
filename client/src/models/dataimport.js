import { createDataset } from '@/services/dataset';

export default {
  namespace: 'dataimport',

  state: {
    currentStep: 0,
    dataset: {},
  },

  effects: {
    *create({ payload }, { call, put }) {
      const response = yield call(createDataset, payload);
      //TODO: handle rest error
      yield put({
        type: 'updateDataset',
        payload: payload,
      });
    },
    *forward({ _ }, { call, put }) {
      yield put({
        type: 'goForward'
      });
    },
    *backward({ _ }, { call, put }) {
      yield put({
        type: 'goBackward'
      });
    },
  },

  reducers: {
    updateDataset(state, action) {
      return {
        ...state,
        dataset: { ...state.dataset, ...action.payload },
      };
    },
    goForward(state, action) {
      return {
        ...state,
        currentStep: state.currentStep+=1,
      };
    },
    goBackward(state, action) {
      return {
        ...state,
        dataset: state.currentStep-=1,
      };
    },
  },
};
