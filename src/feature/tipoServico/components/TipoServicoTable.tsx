import React from 'react'
import { TipoServico } from '../../../types/TipoServico';
import { Results } from '../../../types/Results';
import { DataTable, DataTableRowClickEvent, DataTableStateEvent } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnMeta } from '../../../components/TabelaPaginado';

type Props = {
    data: Results<TipoServico> | undefined;
    rows: number;
    isFetching: boolean;
    rowsPerPage?: number[];

    handleOnPageChange: (page: DataTableStateEvent) => void;
    handleFilterChange: (filterModel: DataTableStateEvent) => void;
    handleDelete: (id: number) => void;
    handleAdicionar: () => void;
};


export function TipoServicoTable({ data, rows, isFetching, rowsPerPage, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar }: Props) {

    const navigation = useNavigate();

    const columns: ColumnMeta<TipoServico>[] = [
        { field: 'tipoServicoNome', header: 'Nome' },
        { field: 'tipoServicoDescricao', header: 'Descrição' },
        { field: 'tipoServicoAtivo', header: 'Ativo?' },
        { field: 'tipoServicoCreateat', header: 'Criado em' }
    ];

    function renderHeader() {

        return <Button label={"Adicionar"} icon="pi pi-plus" onClick={handleAdicionar} />
    }

    function handleEdit(parm: DataTableRowClickEvent) {
        navigation(`/app/cadastro/tipo-servico/edit/${parm.data.tipoServicoId}`);
    }

    const first = data?.number && data?.size ? data?.number * data?.size : 0;
    return (
        <div>
            <DataTable
                value={data?.content}
                totalRecords={data?.totalElements}
                tableStyle={{ minWidth: '50rem' }}
                rowsPerPageOptions={rowsPerPage}
                loading={isFetching}
                rows={rows}
                paginator
                lazy
                first={first}
                showGridlines
                onPage={handleOnPageChange}
                onFilter={handleFilterChange}
                header={renderHeader()}
                onRowClick={handleEdit}
                selectionMode="single"
                metaKeySelection={true}
            >
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div >
    )
}
