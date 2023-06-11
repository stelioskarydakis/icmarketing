import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:3001";

// Load the user data from local storage if available
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser ? storedUser : null,
  error: null,
  isLoggedIn: storedUser ? true : false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUserSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isLoggedIn = true;

      // Store the user data in local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    registerUserFailure: (state, action) => {
      state.error = action.payload;
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isLoggedIn = true;

      // Store the user data in local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginUserFailure: (state, action) => {
      if (action.payload === "Invalid credentials") {
        state.error = "User not found. Please register.";
      } else {
        state.error = action.payload;
      }
    },
    performLogout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;

      // Remove the user data from local storage
      localStorage.removeItem("user");
    },
    editUserSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;

      // Update the user data in local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    editUserFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  registerUserSuccess,
  registerUserFailure,
  loginUserSuccess,
  loginUserFailure,
  performLogout,
  editUserSuccess,
  editUserFailure,
} = usersSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/api/register`, userData);
    dispatch(registerUserSuccess(response.data));
  } catch (error) {
    dispatch(registerUserFailure(error.response.data.error));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/api/login`, userData);
    dispatch(loginUserSuccess(response.data));
  } catch (error) {
    dispatch(loginUserFailure(error.response.data.error));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(performLogout());
};

export const editUser = (userData) => async (dispatch, getState) => {
  const { user } = getState().users;

  const updatedUserData = {
    ...user,
    ...userData,
  };

  try {
    const response = await axios.put(
      `${baseUrl}/api/users/${user.id}`,
      updatedUserData
    );
    dispatch(editUserSuccess(response.data));
  } catch (error) {
    dispatch(editUserFailure(error.response.data.error));
  }
};

export default usersSlice.reducer;
