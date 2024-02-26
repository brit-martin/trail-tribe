const initialState = {
  posts: [],
};

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload.posts };
    case 'RESET_POSTS':
      return { ...state, posts: [] };
    default:
      return state;
  }
}

export default postsReducer;
