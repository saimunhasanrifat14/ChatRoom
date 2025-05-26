// store.js
import { configureStore } from '@reduxjs/toolkit';
import friendReducer from './slices/friendslice'; // default export

export const store = configureStore({
  reducer: {
    friends: friendReducer,
  },
});