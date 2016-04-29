export function createConstants(...constants) {
  return constants.reduce((accumulator, constant) => {
    accumulator[constant] = constant;
    return accumulator;
  }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}
