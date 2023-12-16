import { FetchArgs } from "@reduxjs/toolkit/dist/query"
import { apiSlice } from "../api/apiSlice"
import { IAlmoxarifadoProduto } from "../../types/IAlmoxarifadoProduto"
import { ResponseHandler } from "@reduxjs/toolkit/dist/query/fetchBaseQuery"

const endpoint = '/arquivos'

function uploadLaudoTecnico({file,almoxProd}:{almoxProd:IAlmoxarifadoProduto, file: File}):FetchArgs{
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append("Content-Type", "multipart/form-data");

    return {
        url:`${endpoint}/upload/laudo/${almoxProd.id}`,
        body:formData,
        responseHandler:(res)=> res.text(),
        method:'POST'
    }
}

function alterarLaudoTecnico({file,almoxProd}:{almoxProd:IAlmoxarifadoProduto, file: File}):FetchArgs{
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append("Content-Type", "multipart/form-data");

    return {
        url:`${endpoint}/upload/alterar/laudo/${almoxProd.listaArquivos[0].id}`,
        body:formData,
        responseHandler:(res)=> res.text(),
        method:'PUT'
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
            invalidatesTags: ["AlmoxarifadoProduto","Arquivo"],
        }),
        AlterarLaudoTecnico: mutation<string, {almoxProd:IAlmoxarifadoProduto, file: File}>({
            query: alterarLaudoTecnico,
            invalidatesTags: ["Arquivo"],
        }),
        downloadLaudoTecnico: query<Blob, {almoxProd:IAlmoxarifadoProduto}>({
            query: downloadLaudoTecnico,
        })
    }),
})

export const {
    useUploadLaudoTecnicoMutation,
    useLazyDownloadLaudoTecnicoQuery,
    useAlterarLaudoTecnicoMutation
} = arquivoApiSlice