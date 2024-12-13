import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsers as fetchAllUsers,
  deleteUser as removeUserAPI,
  createUser as addUserAPI,
  updateUser as updateUserAPI,
  getUserByEmail as fetchUserByEmail,
} from "../utils/users";

const initialState = {
  // currentUser: JSON.parse(localStorage.getItem("user")) || {},
  currentUser: {
    email: "test@gmail.com",
    password: "",
    firstname: "test",
    lastname: "test",
    roles: [
      {
        id: 1,
        name: "USER"
      }
    ],
  },
  users: [],
  status: "idle",
  error: null,
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await fetchAllUsers();
  return response;
});

export const getUserByEmail = createAsyncThunk(
  "users/getUserByEmail",
  async (email) => {
    const response = await fetchUserByEmail(email);
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    await removeUserAPI(userId);
    return userId;
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ userData, role }) => {
    console.log("ROLE****: ", role);
    const response = await addUserAPI(userData, role);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }) => {
    const response = await updateUserAPI(userId, userData);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserByEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const { setUser, setStatus, setError } = userSlice.actions;

export default userSlice.reducer;
