import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:3001";

//when registering, login or updating a new user, the user object is stored in localStorage
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
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    registerUserFailure: (state, action) => {
      state.error = action.payload;
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginUserFailure: (state, action) => {
      state.error = action.payload;
    },
    performLogout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;
      //when the user logs out, the user object is removed from localStorage
      localStorage.removeItem("user");
    },
    editUserSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
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
    // we make a POST request to the backend to register the user to manage the user's password and data
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
    //in the backend we return a 401 status code if the user is not found
    if (error.response && error.response.status === 401) {
      dispatch(loginUserFailure("Invalid credentials"));
    } else {
      dispatch(loginUserFailure("User not found"));
    }
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
