import React, { useEffect } from 'react'
import { IAlmoxarifado } from '../../../../types/IAlmoxarifado'
import { AlmoxarifadoProdutoTable } from './AlmoxarifadoProdutoTable'
import { useCreateAlmoxarifadoProdutoMutation, useDeleteAlmoxarifadoProdutoMutation, useGetPageAlmoxarifadoProdutoPorAlmoxarifadoQuery, useUpdateAlmoxarifadoProdutoMutation } from '../../almoxarifadoProdutoSlice'
import { IAlmoxarifadoProduto } from '../../../../types/IAlmoxarifadoProduto'
import { useForm } from 'react-hook-form'
import { DataTableStateEvent } from 'primereact/datatable'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import { LOCAL_STORAGE_KEYS } from '../../../../types/enums/LocalStorage_enum'

import { AlmoxarifadoProdutoForm } from './AlmoxarifadoProdutoForm'
import { Sidebar } from 'primereact/sidebar'
import { useGetProdutosListAtivosQuery } from '../../../materiais/components/materialProduto/ProdutoApiSlice'
import { FileUploadHandlerEvent } from 'primereact/fileupload'
import { useAppDispatch } from '../../../../app/hooks'
import { useAlterarLaudoTecnicoMutation, useLazyDownloadLaudoTecnicoQuery, useUploadLaudoTecnicoMutation } from '../../arquivoSlice'
import { enqueueSnackbar } from 'notistack'

export const baseUrl = import.meta.env.VITE_BASE_URL;

interface AlmoxarifadoProdutoProps {
    almoxarifado: IAlmoxarifado
}

const optionsInit = {
    page: 0,
    rows: 10,
    rowsPerPage: [10, 20, 30],
    almoxarifadoId: 0
};

export function AlmoxarifadoProduto({ almoxarifado }: AlmoxarifadoProdutoProps) {
    const { data, isFetching } = useGetPageAlmoxarifadoProdutoPorAlmoxarifadoQuery({ almoxarifadoId: almoxarifado.id! })
    const [visibleForm, setVisibleForm] = React.useState(false);
    const { value: optionsFilter, updateLocalStorage } = useLocalStorage(LOCAL_STORAGE_KEYS.MATERIAL_FAMILIA, { ...optionsInit, almoxarifadoId: almoxarifado.id! })
    const { control, handleSubmit, getValues, reset, formState: { errors } } = useForm<IAlmoxarifadoProduto>({
        defaultValues: {
            id: 0,
            almoxarifado
        }
    });

    const [createAlmoxarifadoProduto, createStatus] = useCreateAlmoxarifadoProdutoMutation()
    const [deleteAlmoxarifadoProduto, deleteStatus] = useDeleteAlmoxarifadoProdutoMutation()
    const [updateAlmoxarifadoProduto, updateStatus] = useUpdateAlmoxarifadoProdutoMutation()
    const dispatch = useAppDispatch()

    const { data: listProduto } = useGetProdutosListAtivosQuery()
    const [upload, statusUpload] = useUploadLaudoTecnicoMutation()
    const [alterarLaudo, statusAlterarLaudo] = useAlterarLaudoTecnicoMutation()
    const [download, statusDownload] = useLazyDownloadLaudoTecnicoQuery()

    useEffect(() => {
        if (statusUpload.isSuccess || statusAlterarLaudo.isSuccess) {
            enqueueSnackbar("Upload do laudo realizado com  sucesso", { variant: "success", autoHideDuration: 4000 });
        }
    }, [statusUpload, statusAlterarLaudo])

    useEffect(() => {
        if (updateStatus.isSuccess) {
            enqueueSnackbar("Produto alterado no estoque com sucesso", { variant: "success" });
            onHideForm()
        }
    }, [updateStatus.isSuccess]);

    useEffect(() => {
        if (createStatus.isSuccess) {
            enqueueSnackbar("Produto criado no estoque com sucesso", { variant: "success" });
            onHideForm()
        }
    }, [createStatus.isSuccess]);

    function handleAdicionar() {
        setVisibleForm(true)
    }

    function handleEdit(almoxarifadoProduto: IAlmoxarifadoProduto) {
        reset(almoxarifadoProduto)
        setVisibleForm(true)
    }

    function handleFilterChange() {
    }

    async function handleDelete(almoxarifadoProduto: IAlmoxarifadoProduto) {
        deleteAlmoxarifadoProduto(almoxarifadoProduto)
    }

    function handleOnPageChange(page: DataTableStateEvent) {

        updateLocalStorage({
            ...optionsFilter,
            page: page.page ? page.page : 0,
            rows: page.rows ? page.rows : 5,
        });
    }

    function onHideForm() {
        reset({
            id: 0,
        })
        setVisibleForm(false)
    }

    function onSubmit(data: IAlmoxarifadoProduto) {
        if (data.id === 0) {
            createAlmoxarifadoProduto(data)
        }
        else {
            updateAlmoxarifadoProduto(data)
        }
    }

    const isLoading = createStatus.isLoading || updateStatus.isLoading || deleteStatus.isLoading

    function uploadHandler(event: FileUploadHandlerEvent, almoxProd: IAlmoxarifadoProduto) {

        event.files.forEach(file => {
            // let payload: UploadState = {
            //     idInterno: nanoid(),
            //     endpoint: `/arquivos/upload/${almoxProd.id}`,
            //     file: file,
            //     field: 'file',
            // }
            // dispatch(addUpload(payload))
            upload({
                almoxProd,
                file
            })
        })
    }

    function alterarLaudoUploadHandler(event: FileUploadHandlerEvent, almoxProd: IAlmoxarifadoProduto) {

        event.files.forEach(file => {
            alterarLaudo({
                almoxProd,
                file
            })
        })
    }

    async function downloadHandler(almoxProd: IAlmoxarifadoProduto) {
        const arquivo = await download({ almoxProd })

        if (arquivo.data) {

            const url = window.URL.createObjectURL(arquivo.data)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${almoxProd.produto.nome}-${almoxProd.lote}.${arquivo.data.type.split('/')[1]}`)
            document.body.appendChild(link)
            link.click()
        }
    }

    return (
        <div>
            <AlmoxarifadoProdutoTable
                data={data}
                isFetching={isFetching}
                rows={optionsFilter.rows}
                rowsPerPage={optionsFilter.rowsPerPage}
                handleDelete={handleDelete}
                handleFilterChange={handleFilterChange}
                handleOnPageChange={handleOnPageChange}
                handleAdicionar={handleAdicionar}
                handleEdit={handleEdit}
                uploadHandler={uploadHandler}
                downloadHandler={downloadHandler}
                alterarLaudoUploadHandler={alterarLaudoUploadHandler}
            />
            {visibleForm &&
                <Sidebar onHide={onHideForm} visible={visibleForm} className="w-11 md:w-4" position='right' blockScroll>
                    <AlmoxarifadoProdutoForm
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        control={control}
                        isLoading={isLoading}
                        onGoBack={onHideForm}
                        listProduto={listProduto || []}
                        isEdit={getValues().id > 0}
                    />
                </Sidebar>
            }
        </div>
    )
}
