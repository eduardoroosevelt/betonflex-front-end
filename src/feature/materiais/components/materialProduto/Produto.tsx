import React, { useEffect } from 'react'
import { IMaterial } from '../../../../types/Material'
import { useGetMaterialFamiliasListPorMaterialQuery } from '../materialFamilia/MaterialFamiliaApiSlice'
import { Sidebar } from 'primereact/sidebar'
import { ProdutoForm } from './ProdutoForm'
import { IProduto } from '../../../../types/IProduto'
import { useForm } from 'react-hook-form'
import { useCreateProdutoMutation, useDeleteProdutoMutation, useGetProdutosPorMaterialAndMaterialFamiliaQuery, useUpdateProdutoMutation } from './ProdutoApiSlice'
import { ProdutoTable } from './ProdutoTable'
import { enqueueSnackbar } from 'notistack'
import { DataTableStateEvent } from 'primereact/datatable'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import { LOCAL_STORAGE_KEYS } from '../../../../types/enums/LocalStorage_enum'
import { ButtonIcon } from '../../../../components/ButtonComponent'

interface ProdutoFamilia {
    material: IMaterial
}
const optionsInit = {
    page: 0,
    rows: 10,
    rowsPerPage: [10, 20, 30],
    materialId: 0
};

export function Produto({ material }: ProdutoFamilia) {

    const { data: listMaterialFamiliaAtivos } = useGetMaterialFamiliasListPorMaterialQuery({ materialId: material.id })
    const [visibleForm, setVisibleForm] = React.useState(false);
    const [createProduto, createStatus] = useCreateProdutoMutation()
    const [deleteProduto, deleteStatus] = useDeleteProdutoMutation()
    const [updateProduto, updateStatus] = useUpdateProdutoMutation()
    const { value: optionsFilter, updateLocalStorage } = useLocalStorage(LOCAL_STORAGE_KEYS.MATERIAL_FAMILIA, { ...optionsInit, materialId: material.id })

    const { data, isFetching } = useGetProdutosPorMaterialAndMaterialFamiliaQuery({
        ...optionsFilter,
        materialId: material.id
    })

    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<IProduto>({
        defaultValues: {
            id: 0,
            descricao: "",
        }
    });

    useEffect(() => {
        if (createStatus.isSuccess || updateStatus.isSuccess || deleteStatus.isSuccess) {
            onHideForm()
        }
    }, [createStatus.isSuccess, updateStatus.isSuccess, deleteStatus.isSuccess])

    useEffect(() => {
        if (createStatus.isSuccess) {
            enqueueSnackbar("Produto cadastrado com  sucesso", { variant: "success" })
        }
    }, [createStatus.isSuccess])

    useEffect(() => {
        if (updateStatus.isSuccess) {
            enqueueSnackbar("Produto alterado com  sucesso", { variant: "success" })
        }
    }, [updateStatus.isSuccess])

    useEffect(() => {
        if (deleteStatus.isSuccess) {
            enqueueSnackbar("Produto deletado com  sucesso", { variant: "success" })
        }
    }, [deleteStatus.isSuccess])

    function handleAdicionar() {
        setVisibleForm(true)
    }

    function handleEdit(materialFamilia: IProduto) {
        reset(materialFamilia)
        setVisibleForm(true)
    }

    function handleFilterChange() {
    }

    async function handleDelete(materialFamilia: IProduto) {
        deleteProduto(materialFamilia)
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
            descricao: ""
        })
        setVisibleForm(false)
    }

    function onSubmit(data: IProduto) {
        if (data.id === 0) {
            createProduto(data)
        }
        else {
            updateProduto(data)
        }
    }

    const isLoading = createStatus.isLoading || updateStatus.isLoading || deleteStatus.isLoading

    return (
        <div>

            <ProdutoTable
                data={data}
                isFetching={isFetching}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleFilterChange={handleFilterChange}
                handleOnPageChange={handleOnPageChange}
                handleAdicionar={handleAdicionar}
                rows={optionsFilter.rows}
                rowsPerPage={optionsFilter.rowsPerPage}
            />

            {visibleForm &&
                <Sidebar onHide={onHideForm} visible={visibleForm} className="w-11 md:w-4" position='right' >
                    <ProdutoForm
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        control={control}
                        isLoading={isLoading}
                        onGoBack={onHideForm}
                        listMaterialFamiliaAtivos={listMaterialFamiliaAtivos || []}
                    />
                </Sidebar>
            }
        </div>
    )
}
