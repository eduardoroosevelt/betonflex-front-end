import { User } from "../../types/IUser"
import { apiSlice } from "../api/apiSlice"


export interface TokenResponse {
    accessToken: string
    refreshToken: string
    token_type: string
    expires_in: number
}
  
export interface LoginRequest {
    username: string
    password: string
}

const encoded = () => {
    return 'cG9ydGFsLWZyb250OnBvcnRhbC1mcm9udC1zZWNyZXQ=' //Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
}

export const AuthApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        login: mutation<TokenResponse, LoginRequest>({
            query: (credentials) => {
                let formData = new URLSearchParams();
                formData.append("grant_type", "custom_password");
                formData.append("username", credentials.username);
                formData.append("password", credentials.password);
                let body = {
                    grant_type: "custom_password",
                    username: credentials.username,
                    password: credentials.password
                }
                return {
                    url: `/rest/auth/login`,
                    body: body,
                    method: 'POST',
                    headers: {
                        'Authorization':`Basic ${encoded()}`,
                    },
                }
            },
        }),
        buscarUserInfo: query<User, void>({
            query: () => `/usuario/logado`,
        }),
    })
})

export const {
    useLoginMutation,
    useBuscarUserInfoQuery
} = AuthApiSlice
