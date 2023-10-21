import { IMovimentacaoParams, IMovimentacao } from "../../types/IMovimentacao";
import { Results } from "../../types/Results";
import { apiSlice } from "../api/apiSlice";

const endpoints = '/movimentacoes'

function parseQueryParams(params: IMovimentacaoParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.rows) {
        query.append("size", params.rows.toString());
    }

    if (params.almoxarifadoProdutoId) {
        query.append("almoxarifadoProdutoId", params.almoxarifadoProdutoId.toString());
    }
    return query.toString();
}

function getMovimentacaoPorAlmoxarifado(parm: IMovimentacaoParams) {
    return `${endpoints}/almoxarifado/${parm.almoxarifadoId}?${parseQueryParams(parm)}`;
}

function createMovimentacaoMutation(almox: IMovimentacao) {
    return { url: endpoints, method: "POST", body: almox };
}

function updateMovimentacaoMutation(almox: IMovimentacao) {
    return {
        url: `${endpoints}/${almox.id}`,
        method: "PUT",
        body: almox,
    };
}

export const movimentacaoApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getMovimentacaoPorAlmoxarifado: query<Results<IMovimentacao>, IMovimentacaoParams>({
            query: getMovimentacaoPorAlmoxarifado,
            providesTags: ["Movimentacao"],

        }),
        createMovimentacao: mutation<IMovimentacao, IMovimentacao>({
            query: createMovimentacaoMutation,
            invalidatesTags: ["Movimentacao","AlmoxarifadoProduto"],

        }),
        updateMovimentacao: mutation<IMovimentacao, IMovimentacao>({
            query: updateMovimentacaoMutation,
            invalidatesTags: ["Movimentacao"],
        }),
    })
})


export const {
    useGetMovimentacaoPorAlmoxarifadoQuery,
    useCreateMovimentacaoMutation,
    useUpdateMovimentacaoMutation
} = movimentacaoApiSlice