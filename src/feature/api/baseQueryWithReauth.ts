import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { IToken } from "../../types/Token";
import { LOCAL_STORAGE_KEYS } from "../../types/enums/LocalStorage_enum";
import { loggedOut, setToken } from "../auth/authSlice";
import { setMessage } from "../message/messageSlice";
import { Mutex } from 'async-mutex'

export const BASE_URL_PORTAL = import.meta.env.VITE_BASE_URL_PORTAL;

const mutex = new Mutex()

const clientId = import.meta.env.VITE_CLIENT_ID
const clientSecret =import.meta.env.VITE_CLIENT_SECRET

const encoded = () => {
    return 'cG9ydGFsLWZyb250OnBvcnRhbC1mcm9udC1zZWNyZXQ='//Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
}


export const baseQueryWithReauthFn = (baseQueryFn: (baseUrl?: any) => BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>)=>{
    const baseQueryWithReauth: BaseQueryFn<string | FetchArgs,unknown,FetchBaseQueryError> = async (args, api, extraOptions) => {

        let rootState = api.getState() as RootState
        const baseQuery = baseQueryFn()
      
        let result = await baseQuery(args, api, extraOptions)
       
        await mutex.waitForUnlock()
        if (result.error) {
      
          if (result.error.status === 401) {
            // checking whether the mutex is locked
            if (!mutex.isLocked()) {
      
              const release = await mutex.acquire()
              let formData = new URLSearchParams();
              formData.append("grant_type", "refresh_token");
      
              try {
      
                const refreshResult = await baseQuery({
                  url: `/oauth2/token`,
                  method: 'POST',
                  body: formData,
                  credentials: 'include',
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                    'Authorization':`Basic ${encoded()}`
                  }
                },
                  { ...api, extra: { isRefreshToken: true } },
                  extraOptions
                )
      
                if (refreshResult.data) {
      
                  let token = refreshResult.data as IToken
                  api.dispatch(setToken(token))
                  // retry the initial query
                  localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, JSON.stringify(token))
                  result = await baseQuery(args, api, extraOptions)
      
                } else {
      
                  localStorage.clear()
                  api.dispatch(setMessage({
                    message: "Sua sessão expirou! Por favor Logue novamente",
                    type: "error"
                  }))
                  api.dispatch(loggedOut())
                }
      
              } finally {
                // release must be called once the mutex should be released again.
                release()
              }
            } else {
              // wait until the mutex is available without locking it
              await mutex.waitForUnlock()
              result = await baseQuery(args, api, extraOptions)
            }
      
          } else {
            console.log(result.error);
            
            if (result.error.data) {
              let msgUsuario = ''
      
              if (Array.isArray(result.error.data) && result.error.data[0].msgUsuario) {
                msgUsuario = result.error.data[0].msgUsuario
              }
              else {
                msgUsuario = (result.error.data as { msgUsuario: string }).msgUsuario
              }
              
              api.dispatch(setMessage({
                message: msgUsuario,
                type: "error"
              }))
            }
      
          }
        }
      
      
        return result
    }

    return baseQueryWithReauth;
}
