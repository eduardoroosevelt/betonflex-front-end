import { Material, MaterialParams } from "../../types/Material"
import { Results } from "../../types/Results";
import { apiSlice } from "../api/apiSlice"


const endpointUrl = "/materiais"


function parseQueryParams(params: MaterialParams) {
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

function getMaterials({ page = 0, rows = 10, search = "" }) {
    const params = { page, rows, search, isActive: true };

    return `${endpointUrl}?${parseQueryParams(params)}`;
}


function deleteMaterialMutation(material: Material) {
    return {
        url: `${endpointUrl}/${material.materialId}`,
        method: "DELETE",
    };
}

function createMaterialMutation(material: Material) {
    return { url: endpointUrl, method: "POST", body: material };
}

function updateMaterialMutation(material: Material) {
    return {
        url: `${endpointUrl}/${material.materialId}`,
        method: "PUT",
        body: material,
    };
}

function getMaterial({ materialId }: { materialId: number }) {
    return `${endpointUrl}/${materialId}`;
}

function getListMaterialQueNaoPertenceAoAmoxarifado({ almoxarifadoId }: { almoxarifadoId: number }) {
    return `${endpointUrl}/list/${almoxarifadoId}`
}

export const MaterialApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getMaterials: query<Results<Material>, MaterialParams>({
            query: getMaterials,
            providesTags: ["Material"],
        }),
        getMaterial: query<Material, { materialId: number }>({
            query: getMaterial,
            providesTags: ["Material"],
        }),
        createMaterial: mutation<Material, Material>({
            query: createMaterialMutation,
            invalidatesTags: ["Material"],

        }),
        deleteMaterial: mutation<string, { materialId: number }>({
            query: deleteMaterialMutation,
            invalidatesTags: ["Material"],
        }),
        updateMaterial: mutation<Material, Material>({
            query: updateMaterialMutation,
            invalidatesTags: ["Material"],
        }),
        getListMaterialQueNaoPertenceAoAmoxarifado: query<Material[], { almoxarifadoId: number }>({
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