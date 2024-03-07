import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { baseQueryWithReauthFn } from "./baseQueryWithReauth";
// import { keycloak } from "../../keycloakConfig";


export const BASE_URL = import.meta.env.VITE_BASE_URL;

const publicos = ['getVersao'];


const baseQueryFn = (baseUrl= BASE_URL) => fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: Headers, { getState, endpoint, extra }) => {
      let _extra: any = extra
  
      if (_extra && _extra['isRefreshToken']) {
        return headers
      }
  
      const token = (getState() as RootState).auth.token!.accessToken
      const isPublic = !!publicos.find((e) => e == endpoint)
      if (token && !isPublic) {
        headers.set('authorization', `Bearer ${token}`)
      }
      
      return headers
    },
  
  })
export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Almoxarifado", 
    "AlmoxarifadoMaterial", 
    "Material", 
    "TipoServico", 
    "Cliente", 
    "OrdemServico", 
    "OrdemServicoCliente", 
    "OrdemServicoMaterial", 
    "OrdemServicoAnexo", 
    "Funcionario",
    "MaterialFamilia",
    'Produto',
    "AlmoxarifadoProduto",
    "Arquivo",
    "Movimentacao"
],
    endpoints: (builder) => ({}),
    baseQuery: baseQueryWithReauthFn(baseQueryFn),
    // baseQuery: fetchBaseQuery({
    //     baseUrl,
    //     // prepareHeaders: (headers) => {
    //     //   if (keycloak.token) {
    //     //     headers.set("Authorization", `Bearer ${keycloak.token}`);
    //     //   }
    //     //   return headers;
    //     // },
    // }),
});
