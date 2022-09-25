import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs/promises";
import { PlayerModel } from "../../Models/PlayerModel";

export interface PlayerModalState {
  modalShow: boolean;
  player?: PlayerModel;
}

const initialState: PlayerModalState = {
  modalShow: false,
};

export const playerModalSlice = createSlice({
  name: "playerModalSlice",
  initialState,
  reducers: {
    setPlayerModalState(state, action: PayloadAction<PlayerModalState>) {
      state.modalShow = action.payload.modalShow;
      state.player = action.payload.player;
    },
  },
});

export const { setPlayerModalState } = playerModalSlice.actions;

export default playerModalSlice;
