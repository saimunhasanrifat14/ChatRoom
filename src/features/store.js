// store.js
import { configureStore } from '@reduxjs/toolkit';
import friendReducer from './slices/friendSlice'; 

export const store = configureStore({
  reducer: {
    friends: friendReducer,
  },
});