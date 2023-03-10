import { createSlice } from "@reduxjs/toolkit";
import { registerUser, signInUser, isAuth, signOut } from "../actions/users";

let DEFAULT_USER_STATE = {
  loading: false,
  data: {
    _id: null,
    email: null,
    firstname: null,
    lastname: null,
    age: null,
    role: null,
    verified: null,
  },
  auth: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: DEFAULT_USER_STATE,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      // REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = action.payload.auth;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
      })
      // SIGN IN USER
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = action.payload.auth;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
      })
      //IS AUTH
      .addCase(isAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(isAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload.data };
        state.auth = action.payload.auth;
      })
      .addCase(isAuth.rejected, (state) => (state.loading = false))
      // SIGNOUT USER
      .addCase(signOut.pending, (state) => {
        state.data = DEFAULT_USER_STATE.data;
        state.auth = false;
      });
  },
});

export default usersSlice.reducer;
