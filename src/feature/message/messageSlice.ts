
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface MessageProps {
  message: string,
  type: 'success' | 'info' | 'warn' | 'error' | undefined
}
const initialState: MessageProps = {
  message: "",
  type: 'success'
};


export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageProps>) => {
      state.message = action.payload.message
      state.type = action.payload.type
    },
  },

});

export const { setMessage } = messageSlice.actions;

export const selectMessage = (state: RootState) => state.messageReducer;