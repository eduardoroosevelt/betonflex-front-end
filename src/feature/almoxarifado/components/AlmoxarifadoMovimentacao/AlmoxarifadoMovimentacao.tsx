import React, { useEffect } from 'react'
import { IAlmoxarifado } from '../../../../types/IAlmoxarifado'
import { AlmoxarifadoMovimentacaoTable } from './AlmoxarifadoMovimentacaoTable'
import { DataTableStateEvent } from 'primereact/datatable'
import { AlmoxarifadoMovimentacaoFilter } from './AlmoxarifadoMovimentacaoFilter'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import { LOCAL_STORAGE_KEYS } from '../../../../types/enums/LocalStorage_enum'
import { IMovimentacao, IMovimentacaoFilter, IMovimentacaoParams } from '../../../../types/IMovimentacao'
import { useCreateMovimentacaoMutation, useGetMovimentacaoPorAlmoxarifadoQuery, useUpdateMovimentacaoMutation } from '../../../movimentacao/movimentacaoSlice'
import { useForm } from 'react-hook-form'
import { Sidebar } from 'primereact/sidebar'
import { AlmoxarifadoMovimentacaoForm } from './AlmoxarifadoMovimentacaoForm'
import { useGetAlmoxarifadoProdutoListPorAlmoxarifadoQuery } from '../../almoxarifadoProdutoSlice'
import { useSnackbar } from 'notistack'

interface AlmoxarifadoMovimentacaoProps {
    almoxarifado: IAlmoxarifado
}

const optionsInit = {
    page: 0,
    rows: 10,
    rowsPerPage: [10, 20, 30],
    almoxarifadoId: 0
};

export function AlmoxarifadoMovimentacao({ almoxarifado }: AlmoxarifadoMovimentacaoProps) {
    const { enqueueSnackbar } = useSnackbar();
    const { data: listaAlmoxarifadoProduto } = useGetAlmoxarifadoProdutoListPorAlmoxarifadoQuery({ almoxarifadoId: almoxarifado.id! })
    const { value: optionsFilter, updateLocalStorage } = useLocalStorage(LOCAL_STORAGE_KEYS.MOVIMENTACAO_ALMOXARIFADO, { ...optionsInit, almoxarifadoId: almoxarifado.id! })

    const [visibleForm, setVisibleForm] = React.useState(false);
    const { data: listaMovimentacoes } = useGetMovimentacaoPorAlmoxarifadoQuery({
        ...optionsFilter
    })

    const [createMovimentacao, statusCreate] = useCreateMovimentacaoMutation();
    const [updateMovimentacao, statusUpdate] = useUpdateMovimentacaoMutation();

    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<IMovimentacao>({
        defaultValues: {
            id: 0,
        }
    });

    useEffect(() => {
        if (statusUpdate.isSuccess) {
            enqueueSnackbar("Mobimentação alterado com sucesso", { variant: "success" });
            onHideForm()
        }
    }, [statusUpdate.isSuccess]);

    useEffect(() => {
        if (statusCreate.isSuccess) {
            enqueueSnackbar("Mobimentação criado com sucesso", { variant: "success" });
            onHideForm()
        }
    }, [statusCreate.isSuccess]);

    function handlePesquisar(filterModel: IMovimentacaoFilter) {
        updateLocalStorage({
            ...optionsFilter,
            ...filterModel,
            page: 0,
        });
    }

    function onHideForm() {
        reset({
            id: 0,
        })
        setVisibleForm(false)
    }

    function onSubmit(data: IMovimentacao) {

        if (data.id === 0) {
            createMovimentacao(data)
        }
        else {
            updateMovimentacao(data)
        }
    }

    function handleAdicionar() {
        setVisibleForm(true)
    }

    const isLoading = statusCreate.isLoading || statusUpdate.isLoading
    return (
        <div>
            <AlmoxarifadoMovimentacaoFilter
                onPesquisar={handlePesquisar}
                almoxarifadoId={almoxarifado.id}
                listaAlmoxarifadoProduto={listaAlmoxarifadoProduto || []}
            />
            <AlmoxarifadoMovimentacaoTable
                data={listaMovimentacoes}
                rows={optionsFilter.rows}
                rowsPerPage={optionsFilter.rowsPerPage}
                isFetching={false}
                handleAdicionar={handleAdicionar}
                handleOnPageChange={function (page: DataTableStateEvent): void {
                    throw new Error('Function not implemented.')
                }}
                handleFilterChange={function (filterModel: DataTableStateEvent): void {
                    throw new Error('Function not implemented.')
                }}
            />
            {visibleForm &&
                <Sidebar onHide={onHideForm} visible={visibleForm} className="w-11 md:w-4" position='right' blockScroll>

                    <AlmoxarifadoMovimentacaoForm
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        control={control}
                        isLoading={isLoading}
                        onGoBack={onHideForm}
                        listaAlmoxarifadoProduto={listaAlmoxarifadoProduto || []}
                    />
                </Sidebar>
            }
        </div>
    )
}
