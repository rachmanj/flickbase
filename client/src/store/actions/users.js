import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { errorGlobal, successGlobal } from "../reducers/notifications";
import {
  setTokenCookie,
  getAuthHeader,
  getTokenCookie,
  removeTokenCookie,
} from "../../utils/tools";

const HOST_URL = "http://localhost:3001";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ email, password }, { dispatch }) => {
    try {
      const request = await axios.post(`${HOST_URL}/api/auth/register`, {
        email,
        password,
      });
      dispatch(successGlobal("User registered successfully"));

      // set token in cookie
      setTokenCookie(request.data.token);
      return { data: request.data.user, auth: true };
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);

export const signInUser = createAsyncThunk(
  "users/signInUser",
  async ({ email, password }, { dispatch }) => {
    try {
      const request = await axios.post(`${HOST_URL}/api/auth/login`, {
        email,
        password,
      });
      dispatch(successGlobal("User logged in successfully"));

      // set token in cookie
      setTokenCookie(request.data.token);
      return { data: request.data.user, auth: true };
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);

export const isAuth = createAsyncThunk("users/isAuth", async () => {
  try {
    const request = await axios.get(
      `${HOST_URL}/api/auth/isAuth`,
      getAuthHeader()
    );
    return { data: request.data, auth: true };
  } catch (error) {
    return { data: {}, auth: false };
  }
});

export const signOut = createAsyncThunk("users/signOut", async () => {
  removeTokenCookie();
});
