import { Button } from 'primereact/button';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { DataTable, DataTableRowClickEvent, DataTableStateEvent, DataTableValueArray } from 'primereact/datatable';
import React, { useState } from 'react'
import { Results } from '../types/Results';

export interface TabelaPaginadoProps<T> {
    data: Results<T> | undefined;
    rows: number;
    isFetching: boolean;
    rowsPerPage?: number[];
    columns: ColumnMeta[]
    hasEventoAcao?: boolean;

    handleOnPageChange?: (page: DataTableStateEvent) => void;
    handleFilterChange?: (filterModel: DataTableStateEvent) => void;
    handleDelete?: (arg: T) => void;
    handleAdicionar?: () => void;
    handleEdit?: (arg: T) => void;
    botoes?: (arg: T) => React.ReactNode;
};



export interface ColumnMeta {
    field: string;
    header: string;
    body?: (data: any, options: ColumnBodyOptions) => React.ReactNode
}


export function TabelaPaginado<T>({ data, rows, isFetching, rowsPerPage, columns, hasEventoAcao, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar, handleEdit }: TabelaPaginadoProps<T>) {
    const first = data?.number && data?.size ? data?.number * data?.size : 0;
    const [visibleConfirmExcluir, setVisibleConfirmExcluir] = useState(false);
    const [selecteConfirmExclusao, setSelecteConfirmExclusao] = useState<T>();

    function renderHeader() {
        return <Button label={"Adicionar"} icon="pi pi-plus" onClick={handleAdicionar} />
    }

    const onExcluir = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, rowData: T) => {
        event.preventDefault();
        setSelecteConfirmExclusao(rowData);
        setVisibleConfirmExcluir(true);
    };



    const confirmarExclucao = () => {
        setVisibleConfirmExcluir(false);
        handleDelete && handleDelete(selecteConfirmExclusao as T);
    };

    const actionBotoes = (rowData: T) => {
        return (
            <div className="acoesContainer">
                {handleEdit && <Button severity="warning" type="button" tooltip="Editar" tooltipOptions={{ position: "top" }} icon="pi pi-pencil" onClick={() => handleEdit(rowData)} />}
                {handleDelete && <Button severity="danger" type="button" tooltip="Excluir" tooltipOptions={{ position: "top" }} icon="pi pi-trash" className="p-button-danger p-mb-1" onClick={(e) => onExcluir(e, rowData)} />}

            </div>
        );
    };

    function onEdit(parm: DataTableRowClickEvent) {
        handleEdit && handleEdit(parm.data as T);
    }

    const renderFooter = () => {
        return (
            <div>
                <Button
                    label="Sim"
                    type="button"
                    icon="pi pi-check"
                    iconPos="left"
                    onClick={confirmarExclucao}
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
        <div>
            <DataTable
                value={data?.content as DataTableValueArray}
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
                onRowClick={onEdit}
                selectionMode="single"
                metaKeySelection={true}
            >
                {columns.map((col, i) => (<Column key={col.field} field={col.field} header={col.header} body={col.body} />))}
                {hasEventoAcao && <Column header={"Ações"} body={actionBotoes} />}
            </DataTable>
            <Dialog
                header="Confirmação"
                visible={visibleConfirmExcluir}
                footer={renderFooter()}
                onHide={() => setVisibleConfirmExcluir(false)}
                onShow={confirmarExclucao}
                id="confirm_exclusao"
            >
                <p>Deseja realmente remover o registro selecionado? </p>
            </Dialog>
        </div>
    )
}
