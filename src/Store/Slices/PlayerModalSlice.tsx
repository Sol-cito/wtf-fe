import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerModel } from "../../Models/PlayerModel";

export interface ModalState {
  modalShow: boolean;
  player?: PlayerModel;
}

const initialState: ModalState = {
  modalShow: false,
};

export const modalSlice = createSlice({
  name: "playerModalSlice",
  initialState,
  reducers: {
    setModalState(state, action: PayloadAction<ModalState>) {
      state.modalShow = action.payload.modalShow;
      state.player = action.payload.player;
    },
  },
});

export const { setModalState } = modalSlice.actions;

export default modalSlice;
