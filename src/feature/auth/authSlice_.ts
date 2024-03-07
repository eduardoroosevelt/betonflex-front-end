import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IToken } from "../../types/Token";
import { LOCAL_STORAGE_KEYS } from "../../types/enums/LocalStorage_enum";

const token: IToken | null = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)!)
  : null


type AuthState = {
  token: IToken 
}

const initialState:AuthState = {
  token: {
    access_token: token?.access_token || "",
    token_type: token?.token_type || "",
    expires_in: token?.expires_in || 0,
    refresh_token: token?.refresh_token || "",
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken:(state,{payload}:PayloadAction< IToken >) => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN,JSON.stringify(payload))      
      state.token.access_token = payload.access_token
      state.token.token_type = payload.token_type
      state.token.expires_in = payload.expires_in
      state.token.refresh_token = payload.refresh_token
    },
    loggedOut: (state) => { 
      localStorage.clear()    
      state.token.access_token = "";
      state.token.token_type = "";
      state.token.expires_in = 0;
      state.token.refresh_token = "";
    }
  },
});

export const { setToken,loggedOut } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) => {
  return !!state.auth.token.access_token;
};