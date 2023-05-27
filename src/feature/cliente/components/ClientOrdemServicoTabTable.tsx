import React from 'react'
import { OrdemServico } from '../../../types/OrdemServico';
import { Results } from '../../../types/Results';
import { DataTable, DataTableRowClickEvent, DataTableStateEvent } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';

type Props = {
    data: Results<OrdemServico> | undefined;
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


export function ClientOrdemServicoTabTable({ data, rows, isFetching, rowsPerPage, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar }: Props) {
    const navigation = useNavigate();

    const columns: ColumnMeta[] = [
        { field: 'ordemServicoNumero', header: 'N° da ordem' },
        { field: 'tipoServico.tipoServicoNome', header: 'Tipo de Serviço' },
        { field: 'ordemServicoStatus', header: 'Status' },
    ];

    function renderHeader() {

        return <Button label={"Adicionar"} icon="pi pi-plus" onClick={handleAdicionar} />
    }

    function handleEdit(parm: DataTableRowClickEvent) {

        navigation(`/app/cadastro/ordemServico/edit/${parm.data.ordemServicoId}`);
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
