import { Column } from 'primereact/column'
import { DataTable, DataTableRowClickEvent, DataTableStateEvent } from 'primereact/datatable'
import React, { ReactNode } from 'react'
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
    body?: (arg: AlmoxarifadoMaterial) => ReactNode
}

export default function AlmoxarifadoMaterialTable({ data, rows, isFetching, rowsPerPage, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar }: Props) {
    const valorTotalBodyTemplate = (product: AlmoxarifadoMaterial) => {
        return formatCurrency(product.valorTotal);
    };

    const valorUnitarioBodyTemplate = (product: AlmoxarifadoMaterial) => {
        return formatCurrency(product.valorUnitario);
    };

    const columns: ColumnMeta[] = [
        { field: 'material.materialNome', header: 'Nome' },
        { field: 'material.materialDescricao', header: 'Descrição' },
        { field: 'material.materialObservacao', header: 'Observação' },
        { field: 'material.materialSku', header: 'Sku' },
        { field: 'qtde', header: 'Quantidade' },
        { field: 'valorUnitario', header: 'Valor unitário', body: valorUnitarioBodyTemplate },
        { field: 'valorTotal', header: 'Valor Total', body: valorTotalBodyTemplate },
    ];

    function renderHeader() {
        return <Button label={"Adicionar"} icon="pi pi-plus" onClick={handleAdicionar} />
    }

    function handleEdit(parm: DataTableRowClickEvent) {

    }

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    function botoes(data: AlmoxarifadoMaterial) {
        return (
            <div>
                <Button label={"Excluir"} icon="pi pi-trash" severity='danger' onClick={() => handleDelete(data.almoxarifadoMaterialId)} />
            </div>
        )
    }


    const first = data?.number && data?.size ? data?.number * data?.size : 0;

    return (

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
                <Column key={col.field} field={col.field} header={col.header} body={col.body} />
            ))}
            <Column header="Ações" body={botoes} />
        </DataTable>
    )
}
