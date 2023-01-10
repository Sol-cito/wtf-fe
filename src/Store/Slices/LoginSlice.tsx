import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginSliceState {
  isLogin: boolean;
}

const initialState: LoginSliceState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setLoginState(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});

export const { setLoginState } = loginSlice.actions;

export default loginSlice;
