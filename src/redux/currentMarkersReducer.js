// declare the initial state
const initialState = {
  currentMarkers: [],
};

// 2: create the function that we dispatch to to change the state of this reducer
function currentMarkersReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_MARKER':
      console.log(state.currentMarkers);
      return {
        ...state,
        // currentMarkers: currentMarkers.push(action.payload.newMarker),
        ...action.payload.newMarker,
      };
    case 'RESET_MARKERS':
      return {
        ...state,
        currentMarkers: [],
      };
    default:
      return state;
  }
}

export default currentMarkersReducer;
