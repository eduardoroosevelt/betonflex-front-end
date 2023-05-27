import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { OrdemServicoMaterial } from "../../types/OrdemServicoMaterial";
import { apiSlice } from "../api/apiSlice";
import { Results } from "../../types/Results";

const endpointUrl = "/ordemservicomaterials"

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

function createOrdemServicoMaterialMutation(ordemServicoMaterial: OrdemServicoMaterial) {
    return { url: endpointUrl, method: "POST", body: ordemServicoMaterial };
}

function deleteOrdemServicoMaterialMutation(ordemServicoMaterial: OrdemServicoMaterial): FetchArgs {
    return {
        url: `${endpointUrl}/${ordemServicoMaterial.ordemServicoMaterialId}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function updateOrdemServicoMaterialMutation(ordemServicoMaterial: OrdemServicoMaterial) {
    return {
        url: `${endpointUrl}/${ordemServicoMaterial.ordemServicoMaterialId}`,
        method: "PUT",
        body: ordemServicoMaterial,
    };
}

function getOrdemServicoMaterialPelaOrdemServico({ page = 0, rows = 10, search = "", ordemServicoId }: { page?: number; rows?: number; search?: string; ordemServicoId: number }) {
    const params = { page, rows, search };
    return `${endpointUrl}/ordemServico/${ordemServicoId}?${parseQueryParams(params)}`;
}

export const OrdemServicoMaterialApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({

        createOrdemServicoMaterial: mutation<OrdemServicoMaterial, OrdemServicoMaterial>({
            query: createOrdemServicoMaterialMutation,
            invalidatesTags: ["OrdemServicoMaterial", "OrdemServico"],

        }),
        deleteOrdemServicoMaterial: mutation<string, { ordemServicoMaterialId: number }>({
            query: deleteOrdemServicoMaterialMutation,
            invalidatesTags: ["OrdemServicoMaterial", "OrdemServico"],

        }),
        updateOrdemServicoMaterial: mutation<OrdemServicoMaterial, OrdemServicoMaterial>({
            query: updateOrdemServicoMaterialMutation,
            invalidatesTags: ["OrdemServicoMaterial", "OrdemServico"],
        }),
        getOrdemServicoMaterialPelaOrdemServico: query<Results<OrdemServicoMaterial>, { page?: number; rows?: number; search?: string; ordemServicoId: number }>({
            query: getOrdemServicoMaterialPelaOrdemServico,
            providesTags: ["OrdemServicoMaterial"],
        }),

    })

});

export const {
    useCreateOrdemServicoMaterialMutation,
    useDeleteOrdemServicoMaterialMutation,
    useUpdateOrdemServicoMaterialMutation,
    useGetOrdemServicoMaterialPelaOrdemServicoQuery
} = OrdemServicoMaterialApiSlice