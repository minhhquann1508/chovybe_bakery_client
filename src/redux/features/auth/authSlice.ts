import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../store";

interface AuthState {
  token: string;
  id: string;
  role: string;
}

const initialState: AuthState = {
  token: "",
  id: "",
  role: "user",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.token = action.payload.accessToken;
    },
  },
});

export const { addAuth } = authSlice.actions;

export default authSlice.reducer;
