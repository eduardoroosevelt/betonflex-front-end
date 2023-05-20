import { Column } from 'primereact/column'
import { DataTable, DataTableRowClickEvent, DataTableStateEvent } from 'primereact/datatable'
import React from 'react'
import { Results } from '../../../types/Results';
import { AlmoxarifadoMaterial } from '../../../types/Almoxarifado';
import { Button } from 'primereact/button';


type Props = {
    data: Results<AlmoxarifadoMaterial> | undefined;
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

export default function AlmoxarifadoMaterialTable({ data, rows, isFetching, rowsPerPage, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar }: Props) {
    const columns: ColumnMeta[] = [
        { field: 'almoxarifadoNome', header: 'Nome' },
        { field: 'almoxarifadoDescricao', header: 'Descrição' },
        { field: 'almoxarifadoAtivo', header: 'Ativo?' },
        { field: 'almoxarifadoCreateat', header: 'Criado em' }
    ];

    function renderHeader() {
        return <Button label={"Adicionar"} icon="pi pi-plus" onClick={handleAdicionar} />
    }

    function handleEdit(parm: DataTableRowClickEvent) {

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
        </div>
    )
}
