import { Cliente, ClienteParams } from "../../types/Cliente";
import { Results } from "../../types/Results";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/clientes"


function parseQueryParams(params: ClienteParams) {
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

function getClientes({ page = 0, rows = 10, search = "" }) {
    const params = { page, rows, search, isActive: true };

    return `${endpointUrl}?${parseQueryParams(params)}`;
}


function deleteClienteMutation(cliente: Cliente) {
    return {
        url: `${endpointUrl}/${cliente.clienteId}`,
        method: "DELETE",
    };
}

function createClienteMutation(cliente: Cliente) {
    return { url: endpointUrl, method: "POST", body: cliente };
}

function updateClienteMutation(cliente: Cliente) {
    return {
        url: `${endpointUrl}/${cliente.clienteId}`,
        method: "PUT",
        body: cliente,
    };
}

function getCliente({ clienteId }: { clienteId: number }) {
    return `${endpointUrl}/${clienteId}`;
}
export const ClienteApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getClientes: query<Results<Cliente>, ClienteParams>({
            query: getClientes,
            providesTags: ["Cliente"],
        }),
        getCliente: query<Cliente, { clienteId: number }>({
            query: getCliente,
            providesTags: ["Cliente"],
        }),
        createCliente: mutation<Cliente, Cliente>({
            query: createClienteMutation,
            invalidatesTags: ["Cliente"],

        }),
        deleteCliente: mutation<string, { clienteId: number }>({
            query: deleteClienteMutation,
            invalidatesTags: ["Cliente"],
        }),
        updateCliente: mutation<Cliente, Cliente>({
            query: updateClienteMutation,
            invalidatesTags: ["Cliente"],
        }),
    })

});

export const {
    useCreateClienteMutation,
    useGetClienteQuery,
    useGetClientesQuery,
    useDeleteClienteMutation,
    useUpdateClienteMutation,
} = ClienteApiSlice