import { OrdemServicoCliente } from "../../types/OrdemServicoCliente";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/ordemservicoclientes"

function createOrdemServicoClienteMutation(ordemServicoCliente: OrdemServicoCliente) {
    return { url: endpointUrl, method: "POST", body: ordemServicoCliente };
}

function deleteOrdemServicoClienteMutation(ordemServicoCliente: OrdemServicoCliente) {
    return {
        url: `${endpointUrl}/${ordemServicoCliente.ordemServicoClienteId}`,
        method: "DELETE",
    };
}


function updateOrdemServicoClienteMutation(ordemServicoCliente: OrdemServicoCliente) {
    return {
        url: `${endpointUrl}/${ordemServicoCliente.ordemServicoClienteId}`,
        method: "PUT",
        body: ordemServicoCliente,
    };
}

export const OrdemServicoClienteApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({

        createOrdemServicoCliente: mutation<OrdemServicoCliente, OrdemServicoCliente>({
            query: createOrdemServicoClienteMutation,
            invalidatesTags: ["OrdemServicoCliente", "OrdemServico"],

        }),
        deleteOrdemServicoCliente: mutation<string, { ordemServicoClienteId: number }>({
            query: deleteOrdemServicoClienteMutation,
            invalidatesTags: ["OrdemServicoCliente"],
        }),
        updateOrdemServicoCliente: mutation<OrdemServicoCliente, OrdemServicoCliente>({
            query: updateOrdemServicoClienteMutation,
            invalidatesTags: ["OrdemServicoCliente"],
        }),
    })

});

export const {
    useCreateOrdemServicoClienteMutation,
    useDeleteOrdemServicoClienteMutation,
    useUpdateOrdemServicoClienteMutation,
} = OrdemServicoClienteApiSlice