import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { IProduto, IProdutoParams } from "../../../../types/IProduto";
import { Results } from "../../../../types/Results";
import { apiSlice } from "../../../api/apiSlice";

const endpointUrl = "/produtos"


function parseQueryParams(params: IProdutoParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.rows) {
        query.append("size", params.rows.toString());
    }

    return query.toString();
}

function deleteProdutoMutation(produto: IProduto): FetchArgs {
    return {
        url: `${endpointUrl}/${produto.id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function createProdutoMutation(produto: IProduto) {
    return { url: endpointUrl, method: "POST", body: produto };
}

function updateProdutoMutation(produto: IProduto) {
    return {
        url: `${endpointUrl}/${produto.id}`,
        method: "PUT",
        body: produto,
    };
}

function getProdutosPorMaterialAndMaterialFamilia({materialId,...params}:IProdutoParams):FetchArgs{
    return {
        url: `${endpointUrl}/buscaPorMaterialAndMaterialFamilia/${materialId}?${parseQueryParams(params)}`,
        method: "GET"
    }
}

function getProdutosListAtivos():FetchArgs{
    return {
        url: `${endpointUrl}/listAtivos`,
        method: "GET"
    }
}

export const ProdutoApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getProdutosPorMaterialAndMaterialFamilia: query<Results<IProduto>, IProdutoParams>({
            query: getProdutosPorMaterialAndMaterialFamilia,
            providesTags: ["Produto"],
        }),
        getProdutosListAtivos: query<IProduto[], void>({
            query: getProdutosListAtivos,
            providesTags: ["Produto"],
        }),
        createProduto: mutation<IProduto, IProduto>({
            query: createProdutoMutation,
            invalidatesTags: ["Produto"],
        }),
        deleteProduto: mutation<string, { id: number }>({
            query: deleteProdutoMutation,
            invalidatesTags: ["Produto"],
        }),
        updateProduto: mutation<IProduto, IProduto>({
            query: updateProdutoMutation,
            invalidatesTags: ["Produto"],
        }),
    })

});

export const {
    useCreateProdutoMutation,
    useDeleteProdutoMutation,
    useUpdateProdutoMutation,
    useGetProdutosPorMaterialAndMaterialFamiliaQuery,
    useGetProdutosListAtivosQuery
} = ProdutoApiSlice