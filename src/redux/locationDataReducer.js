// declare the initial state
const initialState = {
  locationData: [],
};

// 2: create the function that we dispatch to to change the state of this reducer
function locationDataReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOCATIONS':
      return {
        ...state,
        locationData: action.payload.locationData,
      };
    case 'RESET_LOCATIONS':
      return {
        ...state,
        locationData: [],
      };
    default:
      return state;
  }
}

export default locationDataReducer;
