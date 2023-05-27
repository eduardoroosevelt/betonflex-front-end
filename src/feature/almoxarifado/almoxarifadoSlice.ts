import { FetchArgs } from "@reduxjs/toolkit/dist/query"
import { AlmoxarifadoParams } from "../../types/Almoxarifado"
import { Results } from "../../types/Results"
import { apiSlice } from "../api/apiSlice"

export interface Almoxarifado {
    almoxarifadoId: number
    almoxarifadoNome: string
    almoxarifadoDescricao: string
    almoxarifadoAtivo: boolean
    almoxarifadoCreateat: string
}

const endpointUrl = "/almoxarifados"
const endpointUrlAlmoxarifadoMateriais = "/almoxarifadomaterials"

function parseQueryParams(params: AlmoxarifadoParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.rows) {
        query.append("size", params.rows.toString());
    }

    if (params.search) {
        query.append("search", params.search);
    }

    // if (params.isActive) {
    //     query.append("is_active", params.isActive.toString());
    // }

    return query.toString();
}

function getAlmoxarifados({ page = 0, rows = 10, search = "" }) {
    const params = { page, rows, search, isActive: true };

    return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteAlmoxarifadoMutation(almox: Almoxarifado): FetchArgs {
    return {
        url: `${endpointUrl}/${almox.almoxarifadoId}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function createAlmoxarifadoMutation(almox: Almoxarifado) {
    return { url: endpointUrl, method: "POST", body: almox };
}

function updateAlmoxarifadoMutation(almox: Almoxarifado) {
    return {
        url: `${endpointUrl}/${almox.almoxarifadoId}`,
        method: "PUT",
        body: almox,
    };
}

function getAlmoxarifado({ almoxarifadoId }: { almoxarifadoId: number }) {
    return `${endpointUrl}/${almoxarifadoId}`;
}

function getAlmoxarifadoMaterial({ almoxarifadoId }: { almoxarifadoId: number }) {
    return `${endpointUrlAlmoxarifadoMateriais}/${almoxarifadoId}/materiais`;
}

export const almoxarifadoApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getAlmoxarifados: query<Results<Almoxarifado>, AlmoxarifadoParams>({
            query: getAlmoxarifados,
            providesTags: ["Almoxarifado"],

        }),
        getAlmoxarifado: query<Almoxarifado, { almoxarifadoId: number }>({
            query: getAlmoxarifado,
            providesTags: ["Almoxarifado"],
        }),
        createAlmoxarifado: mutation<Almoxarifado, Almoxarifado>({
            query: createAlmoxarifadoMutation,
            invalidatesTags: ["Almoxarifado"],

        }),
        deleteAlmoxarifado: mutation<string, { almoxarifadoId: number }>({
            query: deleteAlmoxarifadoMutation,
            invalidatesTags: ["Almoxarifado"],
        }),
        updateAlmoxarifado: mutation<Almoxarifado, Almoxarifado>({
            query: updateAlmoxarifadoMutation,
            invalidatesTags: ["Almoxarifado"],
        }),
    })

});

export const {
    useCreateAlmoxarifadoMutation,
    useGetAlmoxarifadoQuery,
    useGetAlmoxarifadosQuery,
    useDeleteAlmoxarifadoMutation,
    useUpdateAlmoxarifadoMutation
} = almoxarifadoApiSlice