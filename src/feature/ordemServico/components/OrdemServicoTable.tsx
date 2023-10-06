import React, { useState } from 'react'
import { Results } from '../../../types/Results';
import { DataTable, DataTableRowClickEvent, DataTableStateEvent } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { OrdemServico } from '../../../types/OrdemServico';
import { Dialog } from 'primereact/dialog';
import { ColumnMeta } from '../../../components/TabelaPaginado';

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


export function OrdemServicoTable({ data, rows, isFetching, rowsPerPage, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar }: Props) {
    const navigation = useNavigate();
    const [visibleConfirmExcluir, setVisibleConfirmExcluir] = useState(false);
    const [selected, setSelected] = useState<OrdemServico | null>();

    const columns: ColumnMeta<OrdemServico>[] = [
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

    function botoes(data: OrdemServico) {
        return (
            <div>
                <Button label={"Excluir"} icon="pi pi-trash" severity='danger' onClick={(e) => onExcluir(e, data)} />
            </div>
        )
    }

    const onExcluir = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, rowData: OrdemServico) => {
        event.preventDefault();
        setSelected(rowData);
        setVisibleConfirmExcluir(true);
    };

    const confirmarExclucao = () => {
        setVisibleConfirmExcluir(false);
        handleDelete && selected && handleDelete(selected?.ordemServicoId);
    };

    const hideConfirmarExclucao = () => {
        setSelected(null);
        setVisibleConfirmExcluir(false);
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
                    onClick={() => hideConfirmarExclucao()}

                />
            </div>
        );
    };

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
                <Column header={'Ação'} body={botoes} />
            </DataTable>
            <Dialog
                header="Confirmação"
                visible={visibleConfirmExcluir}
                footer={renderFooter()}
                onHide={() => hideConfirmarExclucao()}
                onShow={() => confirmarExclucao}
                id="confirm_exclusao"
            >
                <p>Deseja realmente remover o registro selecionado? </p>
            </Dialog>
        </div >
    )
}
