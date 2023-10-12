import { FetchArgs } from "@reduxjs/toolkit/dist/query";

import { Results } from "../../types/Results"
import { apiSlice } from "../api/apiSlice"
import { IAlmoxarifadoProduto, IAlmoxarifadoProdutoParams } from "../../types/IAlmoxarifadoProduto";


const endpointUrl = "/produtosalmoxarifado"

function parseQueryParams(params: IAlmoxarifadoProdutoParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.rows) {
        query.append("size", params.rows.toString());
    }

 
    return query.toString();
}

function deleteAlmoxarifadoMateriaisMutation(almoxProd: IAlmoxarifadoProduto): FetchArgs {
    return {
        url: `${endpointUrl}/${almoxProd.id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function createAlmoxarifadoMateriaisMutation(almoxProd: IAlmoxarifadoProduto) {
    return { url: endpointUrl, method: "POST", body: almoxProd };
}

function updateAlmoxarifadoMateriaisMutation(almoxProd: IAlmoxarifadoProduto) {
    return {
        url: `${endpointUrl}/${almoxProd.id}`,
        method: "PUT",
        body: almoxProd,
    };
}

function getAlmoxarifadoMateriais({ id }: { id: number }): string {
    return `${endpointUrl}/${id}`;
}

function getPageAlmoxarifadoProdutoPorAlmoxarifado({ page = 0, rows = 10, search = "", almoxarifadoId = 0 }) {
    const params = { page, rows, search, isActive: true };
    return `${endpointUrl}/buscaporalmoxarifado/${almoxarifadoId}?${parseQueryParams(params)}`;
}

function getAlmoxarifadoProdutoListPorAlmoxarifado({ almoxarifadoId }: { almoxarifadoId: number }) {
    return `${endpointUrl}/almoxarifado/list/${almoxarifadoId}`;
}

export const almoxarifadoProdutoApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getPageAlmoxarifadoProdutoPorAlmoxarifado: query<Results<IAlmoxarifadoProduto>, IAlmoxarifadoProdutoParams>({
            query: getPageAlmoxarifadoProdutoPorAlmoxarifado,
            providesTags: ["AlmoxarifadoProduto"],
        }),
        getAlmoxarifadoProduto: query<IAlmoxarifadoProduto, { id: number }>({
            query: getAlmoxarifadoMateriais,
            providesTags: ["AlmoxarifadoProduto"],
        }),
        getAlmoxarifadoProdutoListPorAlmoxarifado: query<IAlmoxarifadoProduto[], { almoxarifadoId: number }>({
            query: getAlmoxarifadoProdutoListPorAlmoxarifado,
            providesTags: ["AlmoxarifadoProduto"],
        }),
        createAlmoxarifadoProduto: mutation<IAlmoxarifadoProduto, IAlmoxarifadoProduto>({
            query: createAlmoxarifadoMateriaisMutation,
            invalidatesTags: ["AlmoxarifadoProduto", "Material"],
        }),
        updateAlmoxarifadoProduto: mutation<IAlmoxarifadoProduto, IAlmoxarifadoProduto>({
            query: updateAlmoxarifadoMateriaisMutation,
            invalidatesTags: ["AlmoxarifadoProduto"],
        }),
        deleteAlmoxarifadoProduto: mutation<string, { id: number }>({
            query: deleteAlmoxarifadoMateriaisMutation,
            invalidatesTags: ["AlmoxarifadoProduto"],
        }),
    }),
})

export const {
    useGetPageAlmoxarifadoProdutoPorAlmoxarifadoQuery,
    useGetAlmoxarifadoProdutoQuery,
    useGetAlmoxarifadoProdutoListPorAlmoxarifadoQuery,
    useCreateAlmoxarifadoProdutoMutation,
    useUpdateAlmoxarifadoProdutoMutation,
    useDeleteAlmoxarifadoProdutoMutation
} = almoxarifadoProdutoApiSlice