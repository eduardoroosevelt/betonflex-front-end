import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { OrdemServicoCliente } from "../../types/OrdemServicoCliente";
import { Results } from "../../types/Results";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/ordemservicoclientes"

function parseQueryParams({ page, rows, search }: { page?: number; rows?: number; search?: string }) {
    const query = new URLSearchParams();

    if (page) {
        query.append("page", page.toString());
    }

    if (rows) {
        query.append("size", rows.toString());
    }

    if (search) {
        query.append("search", search);
    }


    return query.toString();
}

function createOrdemServicoClienteMutation(ordemServicoCliente: OrdemServicoCliente) {
    return { url: endpointUrl, method: "POST", body: ordemServicoCliente };
}

function deleteOrdemServicoClienteMutation(ordemServicoCliente: OrdemServicoCliente): FetchArgs {
    return {
        url: `${endpointUrl}/${ordemServicoCliente.ordemServicoClienteId}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function updateOrdemServicoClienteMutation(ordemServicoCliente: OrdemServicoCliente) {
    return {
        url: `${endpointUrl}/${ordemServicoCliente.ordemServicoClienteId}`,
        method: "PUT",
        body: ordemServicoCliente,
    };
}
function vincularClienteOrdemServico(ordemServicoCliente: OrdemServicoCliente) {
    return {
        url: `${endpointUrl}/vincularClienteOrdemServico`,
        method: "POST",
        body: ordemServicoCliente,
    };
}

function getOrdemServicoClientePelaOrdemServico({ page = 0, rows = 10, search = "", ordemServicoId }: { page?: number; rows?: number; search?: string; ordemServicoId: number }) {
    const params = { page, rows, search };
    return `${endpointUrl}/ordemServico/${ordemServicoId}?${parseQueryParams(params)}`;
}

function getOrdemServicoClientePorClientePage({ page = 0, rows = 10, search = "", clienteId }: { page?: number; rows?: number; search?: string; clienteId: number }) {
    const params = { page, rows, search };
    return `${endpointUrl}/cliente/${clienteId}?${parseQueryParams(params)}`;
}

export const OrdemServicoClienteApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({

        createOrdemServicoCliente: mutation<OrdemServicoCliente, OrdemServicoCliente>({
            query: createOrdemServicoClienteMutation,
            invalidatesTags: ["OrdemServicoCliente", "Cliente"],
        }),
        deleteOrdemServicoCliente: mutation<string, { ordemServicoClienteId: number }>({
            query: deleteOrdemServicoClienteMutation,
            invalidatesTags: ["OrdemServicoCliente", "Cliente"],
        }),
        updateOrdemServicoCliente: mutation<OrdemServicoCliente, OrdemServicoCliente>({
            query: updateOrdemServicoClienteMutation,
            invalidatesTags: ["OrdemServicoCliente",],
        }),
        vincularClienteOrdemServico: mutation<OrdemServicoCliente, OrdemServicoCliente>({
            query: vincularClienteOrdemServico,
            invalidatesTags: ["OrdemServicoCliente", "Cliente"],
        }),
        getOrdemServicoClientePelaOrdemServico: query<Results<OrdemServicoCliente>, { page?: number; rows?: number; search?: string; ordemServicoId: number }>({
            query: getOrdemServicoClientePelaOrdemServico,
            providesTags: ["OrdemServicoCliente"],
        }),
        getOrdemServicoClientePorClientePage: query<Results<OrdemServicoCliente>, { page?: number; rows?: number; search?: string; clienteId: number }>({
            query: getOrdemServicoClientePorClientePage,
            providesTags: ["OrdemServicoCliente"],
        })
    })

});

export const {
    useCreateOrdemServicoClienteMutation,
    useDeleteOrdemServicoClienteMutation,
    useUpdateOrdemServicoClienteMutation,
    useVincularClienteOrdemServicoMutation,
    useGetOrdemServicoClientePelaOrdemServicoQuery,
    useGetOrdemServicoClientePorClientePageQuery
} = OrdemServicoClienteApiSlice