import { Results } from "../../types/Results";
import { TipoServico, TipoServicoParams } from "../../types/TipoServico";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/tiposervicos"

function parseQueryParams(params: TipoServicoParams) {
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

function getTipoServicos({ page = 0, rows = 10, search = "" }) {
    const params = { page, rows, search, isActive: true };

    return `${endpointUrl}?${parseQueryParams(params)}`;
}


function deleteTipoServicoMutation(tipoServico: TipoServico) {
    return {
        url: `${endpointUrl}/${tipoServico.tipoServicoId}`,
        method: "DELETE",
    };
}

function createTipoServicoMutation(tipoServico: TipoServico) {
    return { url: endpointUrl, method: "POST", body: tipoServico };
}

function updateTipoServicoMutation(tipoServico: TipoServico) {
    return {
        url: `${endpointUrl}/${tipoServico.tipoServicoId}`,
        method: "PUT",
        body: tipoServico,
    };
}

function getTipoServico({ tipoServicoId }: { tipoServicoId: number }) {
    return `${endpointUrl}/${tipoServicoId}`;
}



export const TipoServicoApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getTipoServicos: query<Results<TipoServico>, TipoServicoParams>({
            query: getTipoServicos,
            providesTags: ["TipoServico"],
        }),
        getTipoServico: query<TipoServico, { tipoServicoId: number }>({
            query: getTipoServico,
            providesTags: ["TipoServico"],
        }),
        createTipoServico: mutation<TipoServico, TipoServico>({
            query: createTipoServicoMutation,
            invalidatesTags: ["TipoServico"],

        }),
        deleteTipoServico: mutation<string, { tipoServicoId: number }>({
            query: deleteTipoServicoMutation,
            invalidatesTags: ["TipoServico"],
        }),
        updateTipoServico: mutation<TipoServico, TipoServico>({
            query: updateTipoServicoMutation,
            invalidatesTags: ["TipoServico"],
        }),
        getTipoServicoList: query<TipoServico[], void>({
            query: () => `${endpointUrl}/ativos`,
            providesTags: ["TipoServico"],
        }),
    })

});

export const {
    useCreateTipoServicoMutation,
    useGetTipoServicoQuery,
    useGetTipoServicosQuery,
    useDeleteTipoServicoMutation,
    useUpdateTipoServicoMutation,
    useGetTipoServicoListQuery
} = TipoServicoApiSlice