import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { OrdemServicoAnexo } from "../../types/OrdemServicoAnexos";
import { Results } from "../../types/Results";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/ordemservicoanexos"

function deleteOrdemServicoAnexoMutation(ordemServico: OrdemServicoAnexo): FetchArgs {
    return {
        url: `${endpointUrl}/${ordemServico.ordemServicoAnexoId}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function downloadOrdemServicoAnexo(ordemServico: OrdemServicoAnexo): FetchArgs {
    return {
        url: `${endpointUrl}/download/base64/${ordemServico.ordemServicoAnexoId}`,
        method: "GET",
        responseHandler: (response) => response.text(),
    };
}

function downloadOrdemServicoAnexoBlob(ordemServico: OrdemServicoAnexo): FetchArgs {
    return {
        url: `${endpointUrl}/download/${ordemServico.ordemServicoAnexoId}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
    };
}



export const OrdemServicoAnexoApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getOrdemServicoAnexo: query<Results<OrdemServicoAnexo>, { ordemServicoId: number }>({
            query: ({ ordemServicoId }) => `${endpointUrl}/ordemservico/${ordemServicoId}`,
            providesTags: ["OrdemServicoAnexo"],
        }),
        deleteOrdemServicoAnexo: mutation<OrdemServicoAnexo, { ordemServicoAnexoId: number }>({
            query: deleteOrdemServicoAnexoMutation,
            invalidatesTags: ["OrdemServicoAnexo"],
        }),
        downloadOrdemServicoAnexo: mutation<string, { ordemServicoAnexoId: number }>({
            query: downloadOrdemServicoAnexo,
        }),
        downloadOrdemServicoAnexoBlob: mutation<Blob, { ordemServicoAnexoId: number }>({
            query: downloadOrdemServicoAnexoBlob,
        }),
    })

});


export const {
    useGetOrdemServicoAnexoQuery,
    useDeleteOrdemServicoAnexoMutation,
    useDownloadOrdemServicoAnexoMutation,
    useDownloadOrdemServicoAnexoBlobMutation,
} = OrdemServicoAnexoApiSlice