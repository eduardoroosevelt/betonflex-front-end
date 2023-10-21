import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { keycloak } from "../../keycloakConfig";

export const baseUrl = import.meta.env.VITE_BASE_URL;
console.log(baseUrl);

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
    baseQuery: fetchBaseQuery({
        baseUrl,
        // prepareHeaders: (headers) => {
        //   if (keycloak.token) {
        //     headers.set("Authorization", `Bearer ${keycloak.token}`);
        //   }
        //   return headers;
        // },
    }),
});
