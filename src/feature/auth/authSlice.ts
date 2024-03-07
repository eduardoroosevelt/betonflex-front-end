import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../types/IUser";
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
    accessToken: token?.accessToken || "",
    token_type: token?.token_type || "",
    expires_in: token?.expires_in || 0,
    refreshToken: token?.refreshToken || "",
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken:(state,{payload}:PayloadAction< IToken >) => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN,JSON.stringify(payload))      
      state.token.accessToken = payload.accessToken
      state.token.token_type = payload.token_type
      state.token.expires_in = payload.expires_in
      state.token.refreshToken = payload.refreshToken
    },
    loggedOut: (state) => { 
      localStorage.clear()    
      state.token.accessToken = "";
      state.token.token_type = "";
      state.token.expires_in = 0;
      state.token.refreshToken = "";
    }
  },
});

export const { setToken,loggedOut } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) => {
  return !!state.auth.token.accessToken;
};