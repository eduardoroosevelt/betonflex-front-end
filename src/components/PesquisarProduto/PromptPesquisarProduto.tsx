import React from 'react'
import { Dialog } from 'primereact/dialog';
import { IProduto } from '../../types/IProduto';
import { PromptPesquisarProdutoTable } from './PromptPesquisarProdutoTable';
import { DataTableStateEvent } from 'primereact/datatable';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../../types/enums/LocalStorage_enum';
import { PromptPesquisarProdutoFilter } from './PromptPesquisarProdutoFilter';
import { useGetListMaterialQuery } from '../../feature/materiais/materialSlice';
import { useGetMaterialFamiliasListPorMaterialQuery } from '../../feature/materiais/components/materialFamilia/MaterialFamiliaApiSlice';
import { useForm } from 'react-hook-form';
import { useGetProdutosPorMaterialAndMaterialFamiliaQuery } from '../../feature/materiais/components/materialProduto/ProdutoApiSlice';

interface PesquisarProdutoProps {
    visible: boolean
    produtoSelecionado: IProduto
    onHide: () => void
}

const optionsInit = {
    page: 0,
    rows: 10,
    rowsPerPage: [10, 20, 30],
    materialId: 0,
    familiaId: 0,
    nome: "",
};

export interface PesquisarProdutoFilter {
    materialId: number
    familiaId: number
    nome: string
}
export function PromptPesquisarProduto({ visible, produtoSelecionado, onHide }: PesquisarProdutoProps) {

    const { value: optionsFilter, updateLocalStorage } = useLocalStorage(LOCAL_STORAGE_KEYS.PROMPT_PRODUTO, { ...optionsInit })
    const { data: listMaterial } = useGetListMaterialQuery()
    const { data: listMaterialFamilia } = useGetMaterialFamiliasListPorMaterialQuery({})
    const { data, isFetching } = useGetProdutosPorMaterialAndMaterialFamiliaQuery({
        ...optionsFilter,
    })
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<PesquisarProdutoFilter>({
        defaultValues: {
            materialId: 0,
            familiaId: 0,
            nome: "",
        }
    });

    function handleFilterChange() {
    }

    function handleOnPageChange(page: DataTableStateEvent) {

        updateLocalStorage({
            ...optionsFilter,
            page: page.page ? page.page : 0,
            rows: page.rows ? page.rows : 5,
        });
    }

    function onSubmit(data: PesquisarProdutoFilter) {

    }

    return (
        <Dialog header="Pesquisar Produto" visible={visible} onHide={onHide}>
            <PromptPesquisarProdutoFilter
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                isLoading={false}
                listMaterial={listMaterial || []}
                listMaterialFamilia={listMaterialFamilia || []}
            />
            <PromptPesquisarProdutoTable
                data={data}
                isFetching={isFetching}
                handleFilterChange={handleFilterChange}
                handleOnPageChange={handleOnPageChange}
                rows={optionsFilter.rows}
                rowsPerPage={optionsFilter.rowsPerPage}
            />
        </Dialog>
    )
}
