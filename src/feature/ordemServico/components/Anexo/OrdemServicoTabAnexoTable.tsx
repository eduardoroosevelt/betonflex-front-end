import { DataTable, DataTableStateEvent } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Results } from '../../../../types/Results';
import { OrdemServicoAnexo } from '../../../../types/OrdemServicoAnexos';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { CardExibirPDFProps } from '../../../../components/CardExibirPDF';
import { useDownloadOrdemServicoAnexoBlobMutation, useDownloadOrdemServicoAnexoMutation } from '../../../ordemServicoAnexo/ordemServicoAnexoSlice';
import { ColumnMeta } from '../../../../components/TabelaPaginado';


type Props = {
    data: Results<OrdemServicoAnexo> | undefined;
    rows: number;
    isFetching: boolean;
    rowsPerPage?: number[];

    handleOnPageChange: (page: DataTableStateEvent) => void;
    handleFilterChange: (filterModel: DataTableStateEvent) => void;
    handleDelete: (id: number) => void;
    handleAdicionar?: () => void;
};


export function OrdemServicoTabAnexoTable({ data, rows, isFetching, rowsPerPage, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar }: Props) {

    const [visibleConfirmExcluir, setVisibleConfirmExcluir] = useState(false);
    const [selected, setSelected] = useState<OrdemServicoAnexo | null>();
    const [stringPDF, setStringPDF] = useState("");
    const [isExibirPDF, setIsExibirPDF] = useState(false);
    const [arquivoDownload, status] = useDownloadOrdemServicoAnexoMutation();
    const [arquivoDownloadBlob, statusBlob] = useDownloadOrdemServicoAnexoBlobMutation();

    const columns: ColumnMeta<OrdemServicoAnexo>[] = [
        { field: 'ordemServicoAnexoArqNome', header: 'Nome' },
        { field: 'contentType', header: 'type' },
    ];

    const first = data?.number && data?.size ? data?.number * data?.size : 0;

    async function abrirPdf(data: OrdemServicoAnexo) {
        try {
            const arquivo = await arquivoDownload({ ordemServicoAnexoId: data.ordemServicoAnexoId }).unwrap();

            setStringPDF(arquivo || "");
            setIsExibirPDF(true);
        } catch (error) {
            console.error('rejected', error);
        }


    }

    async function download(data: OrdemServicoAnexo) {
        arquivoDownloadBlob
        try {
            const arquivo = await arquivoDownloadBlob({ ordemServicoAnexoId: data.ordemServicoAnexoId }).unwrap();
            const a = document.createElement("a");
            a.style.display = "none";
            document.body.appendChild(a);
            a.href = window.URL.createObjectURL(
                new Blob([arquivo])
            );

            a.setAttribute("download", data.ordemServicoAnexoArqNome);


            a.click();

            // Cleanup
            window.URL.revokeObjectURL(a.href);
            document.body.removeChild(a)
        } catch (error) {
            console.error('rejected', error);
        }

    }

    const onHide = () => {
        setIsExibirPDF(false);
        setStringPDF("");
    };

    function botoes(data: OrdemServicoAnexo) {
        return (
            <div className='flex gap-2'>
                <Button icon="pi pi-eye" severity='info' onClick={(e) => abrirPdf(data)} />
                <Button icon="pi pi-download" severity='info' onClick={(e) => download(data)} loading={statusBlob.isLoading} />
                <Button label={"Excluir"} icon="pi pi-trash" severity='danger' onClick={(e) => onExcluir(e, data)} loading={isFetching} />
            </div>
        )
    }

    const onExcluir = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, rowData: OrdemServicoAnexo) => {
        event.preventDefault();
        setSelected(rowData);
        setVisibleConfirmExcluir(true);
    };

    const confirmarExclucao = () => {
        setVisibleConfirmExcluir(false);
        handleDelete && selected && handleDelete(selected?.ordemServicoAnexoId);
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

            <CardExibirPDFProps isExibirPDF={isExibirPDF} stringPDF={stringPDF} onHide={onHide} alturaTela="60.rem" />
        </div>
    )
}
