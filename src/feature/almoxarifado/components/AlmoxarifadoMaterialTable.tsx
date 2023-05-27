import { Column } from 'primereact/column'
import { DataTable, DataTableRowClickEvent, DataTableStateEvent } from 'primereact/datatable'
import React, { ReactNode, useState } from 'react'
import { Results } from '../../../types/Results';
import { AlmoxarifadoMaterial } from '../../../types/Almoxarifado';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';


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
    const [visibleConfirmExcluir, setVisibleConfirmExcluir] = useState(false);
    const [selecteConfirmExclusao, setSelecteConfirmExclusao] = useState<AlmoxarifadoMaterial>();

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
                <Button label={"Excluir"} icon="pi pi-trash" severity='danger' onClick={(e) => onExcluir(e, data)} />
            </div>
        )
    }


    const first = data?.number && data?.size ? data?.number * data?.size : 0;

    const onExcluir = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, rowData: AlmoxarifadoMaterial) => {
        event.preventDefault();
        setSelecteConfirmExclusao(rowData);
        setVisibleConfirmExcluir(true);
    };

    const confirmarExclucao = () => {
        setVisibleConfirmExcluir(false);
        handleDelete && selecteConfirmExclusao && handleDelete(selecteConfirmExclusao?.almoxarifadoMaterialId);
    };

    const renderFooter = () => {
        return (
            <div>
                <Button
                    label="Sim"
                    type="button"
                    icon="pi pi-check"
                    iconPos="left"
                    onClick={confirmarExclucao}
                    text
                    raised
                />

                <Button
                    label="Não"
                    type="button"
                    icon="pi pi-times"
                    iconPos="left"
                    onClick={() => setVisibleConfirmExcluir(false)}

                />
            </div>
        );
    };
    return (
        <>
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
            <Dialog
                header="Confirmação"
                visible={visibleConfirmExcluir}
                footer={renderFooter()}
                onHide={() => setVisibleConfirmExcluir(false)}
                onShow={() => confirmarExclucao}
                id="confirm_exclusao"
            >
                <p>Deseja realmente remover o registro selecionado? </p>
            </Dialog>
        </>
    )
}
