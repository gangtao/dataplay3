export default {
  namespace: 'dataimport',

  state: {
    currentStep: 0,
    dataset: {}
  },

  effects: {
    *forward({ _ }, { call, put }) {
      yield put({
        type: 'goForward',
      });
    },
    *backward({ _ }, { call, put }) {
      yield put({
        type: 'goBackward',
      });
    },
    *saveDatasetInfo({ payload }, { call, put }) {
      yield put({
        type: 'updateDatasetInfo',
        payload: payload,
      });
    },
  },

  reducers: {
    goForward(state, action) {
      return {
        ...state,
        currentStep: (state.currentStep += 1),
      };
    },
    goBackward(state, action) {
      return {
        ...state,
        currentStep: (state.currentStep -= 1),
      };
    },
    updateDatasetInfo(state, action) {
      return {
        ...state,
        dataset: { ...state.dataset, ...action.payload },
      };
    },
  },
};
