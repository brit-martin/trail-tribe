// declare the initial state
const initialState = {
  id: null,
  fname: '',
  lname: '',
  email: '',
  bio: '',
  profilePic: '',
};

// 2: create the function that we dispatch to to change the state of this reducer
function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        id: action.payload.id,
        fname: action.payload.fname,
        lname: action.payload.lname,
        email: action.payload.email,
        bio: action.payload.bio,
        profilePic: action.payload.profilePic,
      };
    case 'RESET_USER':
      return {
        ...state,
        id: null,
        fname: '',
        lname: '',
        email: '',
        bio: '',
        profilePic: '',
      };
    default:
      return state;
  }
}

export default userReducer;

// dispatch({type: 'SET_USER', payload: res.data.user});
