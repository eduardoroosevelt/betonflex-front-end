import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { Funcionario, FuncionarioParams } from "../../types/Funcionario";
import { Results } from "../../types/Results";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/funcionarios"

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


function getFuncionarios({ page = 0, rows = 10, search = "" }) {
    const params = { page, rows, search, isActive: true };

    return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteFuncionarioMutation(funcionario: Funcionario): FetchArgs {
    return {
        url: `${endpointUrl}/${funcionario.funcionarioId}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
    };
}

function createFuncionarioMutation(funcionario: Funcionario) {
    return { url: endpointUrl, method: "POST", body: funcionario };
}

function updateFuncionarioMutation(funcionario: Funcionario) {
    return {
        url: `${endpointUrl}/${funcionario.funcionarioId}`,
        method: "PUT",
        body: funcionario,
    };
}

function getFuncionario({ funcionarioId }: { funcionarioId: number }) {
    return `${endpointUrl}/${funcionarioId}`;
}


export const funcionarioApiSlice = apiSlice.injectEndpoints({

    endpoints: ({ query, mutation }) => ({
        getFuncionarios: query<Results<Funcionario>, FuncionarioParams>({
            query: getFuncionarios,
            providesTags: ["Funcionario"],

        }),
        getFuncionario: query<Funcionario, { funcionarioId: number }>({
            query: getFuncionario,
            providesTags: ["Funcionario"],
        }),
        createFuncionario: mutation<Funcionario, Funcionario>({
            query: createFuncionarioMutation,
            invalidatesTags: ["Funcionario"],

        }),
        deleteFuncionario: mutation<string, { funcionarioId: number }>({
            query: deleteFuncionarioMutation,
            invalidatesTags: ["Funcionario"],
        }),
        updateFuncionario: mutation<Funcionario, Funcionario>({
            query: updateFuncionarioMutation,
            invalidatesTags: ["Funcionario"],
        }),
    })

});


export const {
    useCreateFuncionarioMutation,
    useGetFuncionarioQuery,
    useGetFuncionariosQuery,
    useDeleteFuncionarioMutation,
    useUpdateFuncionarioMutation
} = funcionarioApiSlice