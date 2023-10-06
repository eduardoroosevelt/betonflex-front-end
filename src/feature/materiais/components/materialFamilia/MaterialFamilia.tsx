import React, { useEffect } from 'react'
import { IMaterial } from '../../../../types/Material'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import { LOCAL_STORAGE_KEYS } from '../../../../types/enums/LocalStorage_enum'
import MaterialFamiliaTable from './MaterialFamiliaTable'
import { DataTableStateEvent } from 'primereact/datatable'
import { IMaterialFamilia } from '../../../../types/IMaterialFamilia'
import { useCreateMaterialFamiliaMutation, useDeleteMaterialFamiliaMutation, useGetMaterialFamiliasPorMaterialQuery, useUpdateMaterialFamiliaMutation, } from './MaterialFamiliaApiSlice'
import { Sidebar } from 'primereact/sidebar'
import { MaterialFamiliaForm } from './MaterialFamiliaForm'
import { useForm } from 'react-hook-form'
import { enqueueSnackbar } from 'notistack'

interface MaterialFamilia {
    material: IMaterial
}

const optionsInit = {
    page: 0,
    search: "",
    rows: 10,
    rowsPerPage: [10, 20, 30],
};

export function MaterialFamilia({ material }: MaterialFamilia) {

    const [visibleForm, setVisibleForm] = React.useState(false);
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<IMaterialFamilia>({
        defaultValues: {
            id: 0,
            descricao: "",
            material: material
        }
    });
    const { value: optionsFilter, updateLocalStorage } = useLocalStorage(LOCAL_STORAGE_KEYS.MATERIAL_FAMILIA, optionsInit)
    const { data, isFetching } = useGetMaterialFamiliasPorMaterialQuery({
        ...optionsFilter,
        materialId: material.id
    })

    const [createMaterialFamilia, statusCreateMaterialFamilia] = useCreateMaterialFamiliaMutation();
    const [updateMaterialFamilia, statusUpdateMaterialFamilia] = useUpdateMaterialFamiliaMutation()
    const [deleteMaterialFamilia, statusDeleteMaterialFamilia] = useDeleteMaterialFamiliaMutation();

    useEffect(() => {
        if (statusCreateMaterialFamilia.isSuccess || statusUpdateMaterialFamilia.isSuccess || statusDeleteMaterialFamilia.isSuccess) {
            onHideForm()
        }
    }, [statusCreateMaterialFamilia.isSuccess, statusUpdateMaterialFamilia.isSuccess, statusDeleteMaterialFamilia.isSuccess])

    useEffect(() => {
        if (statusCreateMaterialFamilia.isSuccess) {
            enqueueSnackbar("Família de Material cadastrado com  sucesso", { variant: "success" })
        }
    }, [statusCreateMaterialFamilia.isSuccess])

    useEffect(() => {
        if (statusUpdateMaterialFamilia.isSuccess) {
            enqueueSnackbar("Família de Material alterado com  sucesso", { variant: "success" })
        }
    }, [statusUpdateMaterialFamilia.isSuccess])

    useEffect(() => {
        if (statusDeleteMaterialFamilia.isSuccess) {
            enqueueSnackbar("Família de Material deletado com  sucesso", { variant: "success" })
        }
    }, [statusDeleteMaterialFamilia.isSuccess])

    function handleAdicionar() {
        setVisibleForm(true)
    }

    function handleEdit(materialFamilia: IMaterialFamilia) {
        reset(materialFamilia)
        setVisibleForm(true)
    }

    function handleFilterChange() {
    }

    async function handleDelete(materialFamilia: IMaterialFamilia) {
        deleteMaterialFamilia(materialFamilia)
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
            descricao: "",
            material: material
        })
        setVisibleForm(false)
    }

    function onSubmit(data: IMaterialFamilia) {
        if (data.id === 0) {
            createMaterialFamilia(data)
        }
        else {
            updateMaterialFamilia(data)
        }
    }

    const isLoading = statusCreateMaterialFamilia.isLoading || statusUpdateMaterialFamilia.isLoading || statusDeleteMaterialFamilia.isLoading

    return (
        <div>

            <MaterialFamiliaTable
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
                <Sidebar onHide={onHideForm} visible={visibleForm} className="w-11 md:w-4" position='right' blockScroll>
                    <MaterialFamiliaForm
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        control={control}
                        isLoading={isLoading}
                        onGoBack={onHideForm}
                    />
                </Sidebar>
            }
        </div>
    )
}
