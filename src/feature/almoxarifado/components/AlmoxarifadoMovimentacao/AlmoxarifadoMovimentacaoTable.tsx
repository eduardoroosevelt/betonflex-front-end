import React from 'react'
import { TabelaPaginado } from '../../../../components/TabelaPaginado'
import { IMovimentacao } from '../../../../types/IMovimentacao'
import { DataTableStateEvent } from 'primereact/datatable';
import { Results } from '../../../../types/Results';

type Props = {
    data: Results<IMovimentacao> | undefined;
    rows: number;
    rowsPerPage: number[];
    isFetching: boolean;

    handleOnPageChange: (page: DataTableStateEvent) => void;
    handleFilterChange: (filterModel: DataTableStateEvent) => void;
    handleDelete?: ((arg: IMovimentacao) => void) | null;
    handleEdit?: ((arg: IMovimentacao) => void) | null;
    handleView?: ((arg: IMovimentacao) => void) | null;
    handleAdicionar?: (() => void) | null;
};


export function AlmoxarifadoMovimentacaoTable({
    data,
    rows,
    rowsPerPage,
    isFetching,
    handleOnPageChange,
    handleFilterChange,
    handleDelete,
    handleEdit,
    handleView,
    handleAdicionar,
}: Props) {
    const columns = [
        { field: "almoxarifado_produto.produto.nome", header: "Produto" },
        { field: "almoxarifado_produto.lote", header: "Lote" },
        { field: "tipoMov", header: "Tipo Movimentação" },
        { field: "qtde", header: "Quantidade" },
        { field: "created", header: "Data Movimentação" },
        { field: "observacao", header: "Observação" },
        { field: "statusMov", header: "Status" },
    ]

    return (
        <div className="col-12">
            <TabelaPaginado<IMovimentacao>
                hasEventoAcao
                data={data}
                columns={columns}
                isFetching={isFetching}
                rows={rows}
                rowsPerPage={rowsPerPage}
                handleEdit={handleEdit}
                handleFilterChange={handleFilterChange}
                handleAdicionar={handleAdicionar}
                handleView={handleView}
                handleOnPageChange={handleOnPageChange}
            />
        </div>
    )
}

