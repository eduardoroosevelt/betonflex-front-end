import React from 'react'
import { Funcionario } from '../../../types/Funcionario';
import { Results } from '../../../types/Results';
import { DataTable, DataTableRowClickEvent, DataTableStateEvent } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';

type Props = {
    data: Results<Funcionario> | undefined;
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

export function FuncionarioTable({ data, rows, isFetching, rowsPerPage, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar }: Props) {
    const navigation = useNavigate();

    const columns: ColumnMeta[] = [
        { field: 'funcionarioNome', header: 'Nome' },
        { field: 'funcionarioCargo', header: 'Cargo' },
        { field: 'funcionarioAtivo', header: 'Ativo?' },
    ];

    function renderHeader() {
        return <Button label={"Adicionar"} icon="pi pi-plus" onClick={handleAdicionar} />
    }

    function handleEdit(parm: DataTableRowClickEvent) {
        navigation(`/app/cadastro/funcionario/edit/${parm.data.funcionarioId}`);
    }

    const first = data?.number && data?.size ? data?.number * data?.size : 0;

    function botoes(data: Funcionario) {
        return (
            <div>
                <Button label={"Excluir"} icon="pi pi-trash" severity='danger' onClick={() => handleDelete(data.funcionarioId)} />
            </div>
        )
    }


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

                <Column header="Ações" body={botoes} />
            </DataTable>
        </div >
    )
}
