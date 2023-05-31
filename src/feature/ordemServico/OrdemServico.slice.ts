import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { OrdemServico, OrdemServicoParams } from "../../types/OrdemServico";
import { Results } from "../../types/Results";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/ordemservicos"

function parseQueryParams(params: OrdemServicoParams) {
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

function getOrdemServicos({ page = 0, rows = 10, search = "" }) {
    const params = { page, rows, search, isActive: true };

    return `${endpointUrl}?${parseQueryParams(params)}`;
}


function deleteOrdemServicoMutation(ordemServico: OrdemServico): FetchArgs {
    return {
        url: `${endpointUrl}/${ordemServico.ordemServicoId}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function createOrdemServicoMutation(ordemServico: OrdemServico) {
    return { url: endpointUrl, method: "POST", body: ordemServico };
}

function updateOrdemServicoMutation(ordemServico: OrdemServico) {
    return {
        url: `${endpointUrl}/${ordemServico.ordemServicoId}`,
        method: "PUT",
        body: ordemServico,
    };
}

function getOrdemServico({ ordemServicoId }: { ordemServicoId: number }) {
    return `${endpointUrl}/${ordemServicoId}`;
}

export const OrdemServicoApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getOrdemServicos: query<Results<OrdemServico>, OrdemServicoParams>({
            query: getOrdemServicos,
            providesTags: ["OrdemServico"],
        }),
        getOrdemServico: query<OrdemServico, { ordemServicoId: number }>({
            query: getOrdemServico,
            providesTags: ["OrdemServico"],
        }),
        getOrdemServicoPorClientePage: query<Results<OrdemServico>, { clienteId: number, page?: number, rows?: number }>({
            query: ({ clienteId, page, rows }) => `${endpointUrl}/cliente/${clienteId}?page=${page}&size=${rows}`,
            providesTags: ["OrdemServico"],
        }),
        getUltimaOrdemServico: query<OrdemServico[], void>({
            query: () => `${endpointUrl}/ultimasordemservicos`,
            providesTags: ["OrdemServico"],
        }),
        createOrdemServico: mutation<OrdemServico, OrdemServico>({
            query: createOrdemServicoMutation,
            invalidatesTags: ["OrdemServico"],
        }),
        deleteOrdemServico: mutation<string, { ordemServicoId: number }>({
            query: deleteOrdemServicoMutation,
            invalidatesTags: ["OrdemServico"],
        }),
        updateOrdemServico: mutation<OrdemServico, OrdemServico>({
            query: updateOrdemServicoMutation,
            invalidatesTags: ["OrdemServico"],
        }),
    })

});

export const {
    useCreateOrdemServicoMutation,
    useGetOrdemServicoQuery,
    useGetOrdemServicosQuery,
    useDeleteOrdemServicoMutation,
    useUpdateOrdemServicoMutation,
    useGetOrdemServicoPorClientePageQuery,
    useGetUltimaOrdemServicoQuery
} = OrdemServicoApiSlice