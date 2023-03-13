import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalModel } from "../../Models/CommonModel";

export interface ModalState {
  modalShow: boolean;
  model?: ModalModel;
  includedComponent: React.ReactElement;
  backgroundStyle?: {};
}

const initialState: ModalState = {
  modalShow: false,
  includedComponent: <></>,
};

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setModalState(state, action: PayloadAction<ModalState>) {
      state.modalShow = action.payload.modalShow;
      state.model = action.payload.model;
      state.includedComponent = action.payload.includedComponent;
      state.backgroundStyle = action.payload.backgroundStyle;
    },
  },
});

export const { setModalState } = modalSlice.actions;

export default modalSlice;
