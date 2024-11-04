const initialState = {
  coins: [],
  market: [],
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_COINS":
      return {
        ...state,
        coins: action.payload,
      };

    case "UPDATE_MARKET":
      return {
        ...state,
        market: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload, // Update loading state
      };
    default:
      return state;
  }
};

export default rootReducer;
