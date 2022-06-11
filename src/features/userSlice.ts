import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AppState } from "../types";
import { axiosPublic, axiosPrivate } from "../utils";

const modulePrefix = "user";

const initialState: AppState = {
  user: JSON.parse(localStorage?.getItem("user") as string) || null,
  username: "",
  email: "",
  password: "",
  roles:["user"],
  success: false,
  error: false,
};

export const login = createAsyncThunk(
  `${modulePrefix}/signin`,
  async (_, { getState }) => {
    const state = getState() as RootState;

    const res = await axiosPublic.post("signin", {
      username: state.userData.username,
      password: state.userData.password,
    });
    console.log(res.data);
    return res.data;
  }
  
);

export const register = createAsyncThunk(
  `${modulePrefix}/signup`,
  async (_, { getState }) => {
    const state = getState() as RootState;

    const res = await axiosPublic.post("signup", {
      username: state.userData.username,
      email: state.userData.email,
      password: state.userData.password,
      roles: state.userData.roles
    });
    console.log(res.data);
    return res.data;
  }
  
);

export const logout = createAsyncThunk(
  `${modulePrefix}/api/logout`,
  async (_, { getState }) => {
    const state = getState() as RootState;

    const res = await axiosPrivate.post(
      `logout`,
      {
        token: state.userData?.user?.refreshToken,
      },
      {
        headers: {
          authorization: `Bearer ${state.userData?.user?.accessToken}`,
        },
      }
    );

    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  `${modulePrefix}/api/deleteUser`,
  async (id: number, { getState }) => {
    const state = getState() as RootState;

    const res = await axiosPrivate.delete(`users/${id}`, {
      headers: { authorization: `Bearer ${state.userData.user?.accessToken}` },
    });

    return res.data;
  }
);

export const refreshToken = createAsyncThunk(
  `${modulePrefix}/api/refreshToken`,
  async (_, { getState }) => {
    const state = getState() as RootState;

    const res = await axiosPublic.post(`refresh`, {
      token: state.userData.user?.refreshToken,
    });

    const newUser = {
      ...state.userData.user,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };

    return newUser;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName(state: any, action: PayloadAction<AppState["username"]>) {
      state.username = action.payload;
    },
    updateEmail(state: any, action: PayloadAction<AppState["email"]>) {
      state.password = action.payload;
    },
    updatePassword(state: any, action: PayloadAction<AppState["password"]>) {
      state.password = action.payload;
    },
    updateRoles(state: any, action: PayloadAction<AppState["roles"]>) {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AppState["user"]>) => {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.user = action.payload;
        }
      )
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AppState["user"]>) => {
          state.user = action.payload;
        }
      )
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("user");
        state.user = null;
        state.username = "";
        state.password = "";
        state.success = false;
        state.error = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.success = false;
        state.error = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.error = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.user = action.payload as AppState["user"];
      });
  },
});

export const { updateUserName, updatePassword, updateEmail, updateRoles} = userSlice.actions;
