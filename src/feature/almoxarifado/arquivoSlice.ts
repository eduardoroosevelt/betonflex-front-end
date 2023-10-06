import { FetchArgs } from "@reduxjs/toolkit/dist/query"
import { apiSlice } from "../api/apiSlice"
import { UploadState } from "../upalod/UploadSlice"
import { IAlmoxarifadoProduto } from "../../types/IAlmoxarifadoProduto"
import { ResponseHandler } from "@reduxjs/toolkit/dist/query/fetchBaseQuery"

const endpoint = '/arquivos'

function uploadLaudoTecnico({file,almoxProd}:{almoxProd:IAlmoxarifadoProduto, file: File}):FetchArgs{
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append("Content-Type", "multipart/form-data");

    return {
        url:`${endpoint}/upload/${almoxProd.id}`,
        body:formData,
        responseHandler:(res)=> res.text(),
        method:'POST'
    }
}

function downloadLaudoTecnico({almoxProd}: {almoxProd:IAlmoxarifadoProduto}):FetchArgs{
    return {
        url:`${endpoint}/download/${almoxProd.listaArquivos[0].id}`,
        responseHandler:(res)=>{
             return res.blob().then(blob => blob)
        },
    }
}

export const arquivoApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        uploadLaudoTecnico: mutation<string, {almoxProd:IAlmoxarifadoProduto, file: File}>({
            query: uploadLaudoTecnico,
            invalidatesTags: ["AlmoxarifadoProduto"],
        }),
        downloadLaudoTecnico: query<Blob, {almoxProd:IAlmoxarifadoProduto}>({
            query: downloadLaudoTecnico,
            providesTags: ["Arquivo"],
        })
    }),
})

export const {
    useUploadLaudoTecnicoMutation,
    useLazyDownloadLaudoTecnicoQuery
} = arquivoApiSlice