import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  headerBtnValue: string;
}

const initialState: CommonState = {
  headerBtnValue: "home",
};

export const headerBtnSlice = createSlice({
  name: "headerBtnSlice",
  initialState,
  reducers: {
    setHeaderBtn(state, action: PayloadAction<string>) {
      state.headerBtnValue = action.payload;
    },
  },
});

export const { setHeaderBtn } = headerBtnSlice.actions;

export default headerBtnSlice;
