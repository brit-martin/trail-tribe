// Redux 1: import redux configurStore function
import { configureStore } from '@reduxjs/toolkit';
// Redux 2: import all of your redux reducers (redux global states)
import userReducer from './userReducer.js';

export default configureStore({
  reducer: {
    userReducer: userReducer,
  },
});