import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { AlmoxarifadoMaterial, AlmoxarifadoMaterialParams, AlmoxarifadoParams } from "../../types/Almoxarifado"
import { Material } from "../../types/Material";
import { Results } from "../../types/Results"
import { apiSlice } from "../api/apiSlice"


const endpointUrl = "/almoxarifadomaterials"

function parseQueryParams(params: AlmoxarifadoMaterialParams) {
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

function deleteAlmoxarifadoMateriaisMutation(almox: AlmoxarifadoMaterial): FetchArgs {
    return {
        url: `${endpointUrl}/${almox.almoxarifadoMaterialId}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function createAlmoxarifadoMateriaisMutation(almox: AlmoxarifadoMaterial) {
    return { url: endpointUrl, method: "POST", body: almox };
}

function updateAlmoxarifadoMateriaisMutation(almox: AlmoxarifadoMaterial) {
    return {
        url: `${endpointUrl}/${almox.almoxarifadoMaterialId}`,
        method: "PUT",
        body: almox,
    };
}

function getAlmoxarifadoMateriais({ almoxarifadoMaterialId }: { almoxarifadoMaterialId: number }) {
    return `${endpointUrl}/${almoxarifadoMaterialId}`;
}

function getPageAlmoxarifadoMateriaisPorAlmoxarifado({ page = 0, rows = 10, search = "", almoxarifadoId = 0 }) {
    const params = { page, rows, search, isActive: true };
    return `${endpointUrl}/almoxarifado/${almoxarifadoId}?${parseQueryParams(params)}`;
}

export const almoxarifadoMaterialApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getPageAlmoxarifadoMateriaisPorAlmoxarifado: query<Results<AlmoxarifadoMaterial>, AlmoxarifadoMaterialParams>({
            query: getPageAlmoxarifadoMateriaisPorAlmoxarifado,
            providesTags: ["AlmoxarifadoMaterial"],
        }),
        getAlmoxarifadoMaterial: query<AlmoxarifadoMaterial, { almoxarifadoMaterialId: number }>({
            query: getAlmoxarifadoMateriais,
            providesTags: ["AlmoxarifadoMaterial"],
        }),
        createAlmoxarifadoMaterial: mutation<AlmoxarifadoMaterial, AlmoxarifadoMaterial>({
            query: createAlmoxarifadoMateriaisMutation,
            invalidatesTags: ["AlmoxarifadoMaterial", "Material"],
        }),
        updateAlmoxarifadoMaterial: mutation<AlmoxarifadoMaterial, AlmoxarifadoMaterial>({
            query: updateAlmoxarifadoMateriaisMutation,
            invalidatesTags: ["AlmoxarifadoMaterial"],
        }),
        deleteAlmoxarifadoMaterial: mutation<string, { almoxarifadoMaterialId: number }>({
            query: deleteAlmoxarifadoMateriaisMutation,
            invalidatesTags: ["AlmoxarifadoMaterial"],
        }),
    }),
})

export const {
    useGetPageAlmoxarifadoMateriaisPorAlmoxarifadoQuery,
    useGetAlmoxarifadoMaterialQuery,
    useCreateAlmoxarifadoMaterialMutation,
    useUpdateAlmoxarifadoMaterialMutation,
    useDeleteAlmoxarifadoMaterialMutation
} = almoxarifadoMaterialApiSlice