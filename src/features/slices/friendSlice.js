// friendslice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    FriendAction: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { FriendAction } = friendSlice.actions;

export default friendSlice.reducer;
