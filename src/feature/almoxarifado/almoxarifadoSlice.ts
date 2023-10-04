import { FetchArgs } from "@reduxjs/toolkit/dist/query"
import { IAlmoxarifadoParams, IAlmoxarifado } from "../../types/IAlmoxarifado"
import { Results } from "../../types/Results"
import { apiSlice } from "../api/apiSlice"


const endpointUrl = "/almoxarifados"
const endpointUrlAlmoxarifadoMateriais = "/almoxarifadomaterials"

function parseQueryParams(params: IAlmoxarifadoParams) {
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

    return query.toString();
}

function getAlmoxarifados({ page = 0, rows = 10, search = "" }) {
    const params = { page, rows, search, isActive: true };

    return `${endpointUrl}/buscanegenerica?${parseQueryParams(params)}`;
}

function deleteAlmoxarifadoMutation(almox: IAlmoxarifado): FetchArgs {
    return {
        url: `${endpointUrl}/${almox.id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function createAlmoxarifadoMutation(almox: IAlmoxarifado) {
    return { url: endpointUrl, method: "POST", body: almox };
}

function updateAlmoxarifadoMutation(almox: IAlmoxarifado) {
    return {
        url: `${endpointUrl}/${almox.id}`,
        method: "PUT",
        body: almox,
    };
}

function getAlmoxarifado({ id }: { id: number }) {
    return `${endpointUrl}/${id}`;
}

function getAlmoxarifadoMaterial({ id }: { id: number }) {
    return `${endpointUrlAlmoxarifadoMateriais}/${id}/materiais`;
}

export const almoxarifadoApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getAlmoxarifados: query<Results<IAlmoxarifado>, IAlmoxarifadoParams>({
            query: getAlmoxarifados,
            providesTags: ["Almoxarifado"],

        }),
        getAlmoxarifado: query<IAlmoxarifado, { id: number }>({
            query: getAlmoxarifado,
            providesTags: ["Almoxarifado"],
        }),
        getAlmoxarifadoList: query<IAlmoxarifado[], void>({
            query: () => `${endpointUrl}/ativos`,
            providesTags: ["Almoxarifado"],
        }),
        createAlmoxarifado: mutation<IAlmoxarifado, IAlmoxarifado>({
            query: createAlmoxarifadoMutation,
            invalidatesTags: ["Almoxarifado"],

        }),
        deleteAlmoxarifado: mutation<string, { id: number }>({
            query: deleteAlmoxarifadoMutation,
            invalidatesTags: ["Almoxarifado"],
        }),
        updateAlmoxarifado: mutation<IAlmoxarifado, IAlmoxarifado>({
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
    useUpdateAlmoxarifadoMutation,
    useGetAlmoxarifadoListQuery,
} = almoxarifadoApiSlice