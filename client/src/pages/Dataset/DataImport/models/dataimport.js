export default {
  namespace: 'dataimport',

  state: {
    currentStep: 0,
    dataset: {},
  },

  effects: {},

  reducers: {
    forward(state) {
      const newStep = state.currentStep + 1;
      return {
        ...state,
        currentStep: newStep,
      };
    },
    backward(state) {
      const newStep = state.currentStep - 1;
      return {
        ...state,
        currentStep: newStep,
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
