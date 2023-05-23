import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { keycloak } from "../../keycloakConfig";

export const baseUrl = "http://localhost:8083";

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Almoxarifado", "AlmoxarifadoMaterial", "Material", "TipoServico", "Cliente"],
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