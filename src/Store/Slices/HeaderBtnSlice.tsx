import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  value: string;
}

const initialState: CommonState = {
  value: "home",
};

export const headerBtnSlice = createSlice({
  name: "headerBtnSlice",
  initialState,
  reducers: {
    setHeaderBtn(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { setHeaderBtn } = headerBtnSlice.actions;

export default headerBtnSlice;
