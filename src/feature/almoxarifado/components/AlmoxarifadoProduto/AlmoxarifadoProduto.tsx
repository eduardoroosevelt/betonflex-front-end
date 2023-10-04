import React from 'react'
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
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<IAlmoxarifadoProduto>({
        defaultValues: {
            id: 0,
            almoxarifado
        }
    });

    const [createAlmoxarifadoProduto, createStatus] = useCreateAlmoxarifadoProdutoMutation()
    const [deleteAlmoxarifadoProduto, deleteStatus] = useDeleteAlmoxarifadoProdutoMutation()
    const [updateAlmoxarifadoProduto, updateStatus] = useUpdateAlmoxarifadoProdutoMutation()
    const { data: listProduto } = useGetProdutosListAtivosQuery()

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
            />
            {visibleForm &&
                <Sidebar onHide={onHideForm} visible={visibleForm} className="w-11 md:w-4" position='right' >
                    <AlmoxarifadoProdutoForm
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        control={control}
                        isLoading={isLoading}
                        onGoBack={onHideForm}
                        listProduto={listProduto || []}
                    />
                </Sidebar>
            }
        </div>
    )
}
