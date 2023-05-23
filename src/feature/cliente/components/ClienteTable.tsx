import React from 'react'
import { Cliente } from '../../../types/Cliente';
import { Results } from '../../../types/Results';
import { DataTable, DataTableRowClickEvent, DataTableStateEvent } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';

type Props = {
    data: Results<Cliente> | undefined;
    rows: number;
    isFetching: boolean;
    rowsPerPage?: number[];

    handleOnPageChange: (page: DataTableStateEvent) => void;
    handleFilterChange: (filterModel: DataTableStateEvent) => void;
    handleDelete: (id: number) => void;
    handleAdicionar: () => void;
};


interface ColumnMeta {
    field: string;
    header: string;
}


export function ClientTable({ data, rows, isFetching, rowsPerPage, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar }: Props) {
    const navigation = useNavigate();

    const columns: ColumnMeta[] = [
        { field: 'clienteNome', header: 'Nome' },
        { field: 'clienteDocumento', header: 'Documento' },
        { field: 'clienteCreateat', header: 'Criado em' }
    ];

    function renderHeader() {

        return <Button label={"Adicionar"} icon="pi pi-plus" onClick={handleAdicionar} />
    }

    function handleEdit(parm: DataTableRowClickEvent) {

        navigation(`/app/cadastro/cliente/edit/${parm.data.clienteId}`);
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
