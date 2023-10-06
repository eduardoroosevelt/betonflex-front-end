import React, { useState } from 'react'
import { OrdemServicoMaterial } from '../../../../types/OrdemServicoMaterial';
import { Results } from '../../../../types/Results';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { ColumnMeta } from '../../../../components/TabelaPaginado';

type Props = {
    data: Results<OrdemServicoMaterial> | undefined;
    rows: number;
    isFetching: boolean;
    rowsPerPage?: number[];

    handleOnPageChange: (page: DataTableStateEvent) => void;
    handleFilterChange: (filterModel: DataTableStateEvent) => void;
    handleDelete: (id: number) => void;
    handleAdicionar: () => void;
};

export function OrdemServicoTabMaterialTable({ data, rows, isFetching, rowsPerPage, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar }: Props) {
    const [visibleConfirmExcluir, setVisibleConfirmExcluir] = useState(false);
    const [selected, setSelected] = useState<OrdemServicoMaterial | null>();
    const first = data?.number && data?.size ? data?.number * data?.size : 0;

    const columns: ColumnMeta<OrdemServicoMaterial>[] = [
        { field: 'almoxarifadoMaterial.material.materialNome', header: 'Nome' },
        { field: 'almoxarifadoMaterial.material.materialSku', header: 'Sku' },
        { field: 'almoxarifadoMaterial.material.materialDescricao', header: 'Descrição' },
        { field: 'almoxarifadoMaterial.material.materialObservacao', header: 'Observação' }
    ];

    function renderHeader() {
        return <Button label={"Adicionar"} icon="pi pi-plus" onClick={handleAdicionar} />
    }

    function botoes(data: OrdemServicoMaterial) {
        return (
            <div>
                <Button label={"Excluir"} icon="pi pi-trash" severity='danger' onClick={(e) => onExcluir(e, data)} />
            </div>
        )
    }

    const onExcluir = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, rowData: OrdemServicoMaterial) => {
        event.preventDefault();

        setSelected(rowData);
        setVisibleConfirmExcluir(true);
    };

    const confirmarExclucao = () => {
        setVisibleConfirmExcluir(false);
        handleDelete && selected && handleDelete(selected?.ordemServicoMaterialId);
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
                selectionMode="single"
                metaKeySelection={true}
                selection={selected || []}
            >
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
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
        </div >
    )
}
