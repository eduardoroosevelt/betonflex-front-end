import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { IMaterial, IMaterialParams } from "../../types/Material"
import { Results } from "../../types/Results";
import { apiSlice } from "../api/apiSlice"


const endpointUrl = "/materiais"


function parseQueryParams(params: IMaterialParams) {
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

function getMaterials({ page = 0, rows = 10, search = "" }) {
    const params = { page, rows, search, isActive: true };

    return `${endpointUrl}/buscanegenerica?${parseQueryParams(params)}`;
}


function deleteMaterialMutation(material: IMaterial): FetchArgs {
    return {
        url: `${endpointUrl}/${material.id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function createMaterialMutation(material: IMaterial) {
    return { url: endpointUrl, method: "POST", body: material };
}

function updateMaterialMutation(material: IMaterial) {
    return {
        url: `${endpointUrl}/${material.id}`,
        method: "PUT",
        body: material,
    };
}

function getMaterial({ id }: { id: number }) {
    return `${endpointUrl}/${id}`;
}

function getListMaterialQueNaoPertenceAoAmoxarifado({ almoxarifadoId }: { almoxarifadoId: number }) {
    return `${endpointUrl}/matriaisout/almoxarifado/${almoxarifadoId}`
}

export const MaterialApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getMaterials: query<Results<IMaterial>, IMaterialParams>({
            query: getMaterials,
            providesTags: ["Material"],
        }),
        getMaterial: query<IMaterial, { id: number }>({
            query: getMaterial,
            providesTags: ["Material"],
        }),
        createMaterial: mutation<IMaterial, IMaterial>({
            query: createMaterialMutation,
            invalidatesTags: ["Material"],

        }),
        deleteMaterial: mutation<string, { id: number }>({
            query: deleteMaterialMutation,
            invalidatesTags: ["Material"],
        }),
        updateMaterial: mutation<IMaterial, IMaterial>({
            query: updateMaterialMutation,
            invalidatesTags: ["Material"],
        }),
        getListMaterialQueNaoPertenceAoAmoxarifado: query<IMaterial[], { almoxarifadoId: number }>({
            query: getListMaterialQueNaoPertenceAoAmoxarifado,
            providesTags: ["Material"],
        }),
    })

});

export const {
    useCreateMaterialMutation,
    useGetMaterialQuery,
    useGetMaterialsQuery,
    useDeleteMaterialMutation,
    useUpdateMaterialMutation,
    useGetListMaterialQueNaoPertenceAoAmoxarifadoQuery
} = MaterialApiSlice