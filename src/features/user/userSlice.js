import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  addUserToLocalStorage,
} from "../../utils/localStorage";

import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";


const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
}




export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    // console.log(`Register User : ${JSON.stringify(user)}`)
    try {
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch("/auth/updateUser", user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);


export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    // logout user
    thunkAPI.dispatch(logoutUser(message));
    // clear jobs value
    thunkAPI.dispatch(clearAllJobsState());
    // clear job input values
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    // console.log(error);
    return Promise.reject();
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;

      addUserToLocalStorage(user);
      toast.success("User Updated");
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [clearStoreThunk.rejected]: () => {
      toast.error("There was an error");
    },
  },
});

export default userSlice.reducer;
export const { toggleSidebar, logoutUser } = userSlice.actions;
