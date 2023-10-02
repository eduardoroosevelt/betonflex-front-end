import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { IMaterialFamilia, IMaterialFamiliaParams } from "../../../../types/IMaterialFamilia";
import { apiSlice } from "../../../api/apiSlice";
import { Results } from "../../../../types/Results";



const endpointUrl = "/materialFamilia"


function parseQueryParams(params: IMaterialFamiliaParams) {
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

function getMaterialFamiliasPorMaterial({ page = 0, rows = 10, search = "",materialId }:IMaterialFamiliaParams) {
    const params = { page, rows, search, isActive: true };

    return `${endpointUrl}/buscanegenerica/${materialId}?${parseQueryParams(params)}`;
}

function getMaterialFamiliasListPorMaterial({ materialId }:IMaterialFamiliaParams) {
    return `${endpointUrl}/buscaListAtivos/${materialId}`;
}


function deleteMaterialMutation(material: IMaterialFamilia): FetchArgs {
    return {
        url: `${endpointUrl}/${material.id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function createMaterialMutation(material: IMaterialFamilia) {
    return { url: endpointUrl, method: "POST", body: material };
}

function updateMaterialMutation(material: IMaterialFamilia) {
    return {
        url: `${endpointUrl}/${material.id}`,
        method: "PUT",
        body: material,
    };
}

function getMaterial({ id }: { id: number }) {
    return `${endpointUrl}/${id}`;
}


export const MaterialFamiliaApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getMaterialFamilias: query<Results<IMaterialFamilia>, IMaterialFamiliaParams>({
            query: getMaterials,
            providesTags: ["MaterialFamilia"],
        }),
        getMaterialFamiliasPorMaterial: query<Results<IMaterialFamilia>, IMaterialFamiliaParams>({
            query: getMaterialFamiliasPorMaterial,
            providesTags: ["MaterialFamilia"],
        }),
        getMaterialFamiliasListPorMaterial: query<IMaterialFamilia[], IMaterialFamiliaParams>({
            query: getMaterialFamiliasListPorMaterial,
            providesTags: ["MaterialFamilia"],
        }),
        getMaterialFamilia: query<IMaterialFamilia, { id: number }>({
            query: getMaterial,
            providesTags: ["MaterialFamilia"],
        }),
        createMaterialFamilia: mutation<IMaterialFamilia, IMaterialFamilia>({
            query: createMaterialMutation,
            invalidatesTags: ["MaterialFamilia"],
        }),
        deleteMaterialFamilia: mutation<string, { id: number }>({
            query: deleteMaterialMutation,
            invalidatesTags: ["MaterialFamilia"],
        }),
        updateMaterialFamilia: mutation<IMaterialFamilia, IMaterialFamilia>({
            query: updateMaterialMutation,
            invalidatesTags: ["MaterialFamilia"],
        }),
    })

});

export const {
useCreateMaterialFamiliaMutation,
useDeleteMaterialFamiliaMutation,
useUpdateMaterialFamiliaMutation,
useGetMaterialFamiliaQuery,
useGetMaterialFamiliasQuery,
useGetMaterialFamiliasPorMaterialQuery,
useGetMaterialFamiliasListPorMaterialQuery
} = MaterialFamiliaApiSlice