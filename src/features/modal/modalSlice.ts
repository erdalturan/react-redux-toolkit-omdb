import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ModalInterface } from '../../types';

interface initState {
  isOpen: boolean;
}
const initialState: initState = {
  isOpen: false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state: any, action: PayloadAction<ModalInterface["modalStatus"]> ) => {
      state.isOpen = true;
    },
    closeModal: (state: any, action: PayloadAction<ModalInterface["modalStatus"]>) => {
      state.isOpen = false;
    }
  }
});

export const {openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
