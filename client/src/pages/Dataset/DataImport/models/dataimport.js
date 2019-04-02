export default {
  namespace: 'dataimport',

  state: {
    currentStep: 0,
    dataset: {},
  },

  effects: {},

  reducers: {
    forward(state, action) {
      return {
        ...state,
        currentStep: (state.currentStep += 1),
      };
    },
    backward(state, action) {
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
