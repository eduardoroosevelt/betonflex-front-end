import React from 'react'
import { IProduto } from '../../../../types/IProduto';
import { Results } from '../../../../types/Results';
import { DataTableStateEvent } from 'primereact/datatable';
import { ColumnMeta, TabelaPaginado } from '../../../../components/TabelaPaginado';
import { Tag } from 'primereact/tag';
import { IAlmoxarifadoProduto } from '../../../../types/IAlmoxarifadoProduto';


type Props = {
    data: Results<IAlmoxarifadoProduto> | undefined;
    rows: number;
    rowsPerPage: number[];
    isFetching: boolean;

    handleOnPageChange: (page: DataTableStateEvent) => void;
    handleFilterChange: (filterModel: DataTableStateEvent) => void;
    handleDelete?: ((arg: IAlmoxarifadoProduto) => void) | null;
    handleEdit?: ((arg: IAlmoxarifadoProduto) => void) | null;
    handleView?: ((arg: IAlmoxarifadoProduto) => void) | null;
    handleAdicionar?: (() => void) | null;
};

export function AlmoxarifadoProdutoTable({
    data,
    rows,
    rowsPerPage,
    isFetching,
    handleOnPageChange,
    handleFilterChange,
    handleDelete,
    handleEdit,
    handleView,
    handleAdicionar
}: Props) {
    const columns: ColumnMeta[] = [
        { field: "produto.nome", header: "Produto" },
        { field: "lote", header: "Lote" },
        { field: "qtde", header: "Quantidade" },
        { field: "created", header: "Criado em" },
        // { header: "Ativo?", body: (data) => data.ativo ? <Tag severity="success" value="ATIVO" className='w-full' /> : <Tag severity="danger" value="INATIVO" className='w-full' /> },
    ];

    return (
        <div className="col-12">
            <TabelaPaginado<IAlmoxarifadoProduto>
                data={data}
                columns={columns}
                isFetching={isFetching}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleFilterChange={handleFilterChange}
                handleOnPageChange={handleOnPageChange}
                rows={rows}
                rowsPerPage={rowsPerPage}
                handleAdicionar={handleAdicionar}
                hasEventoAcao
            />
        </div>
    )
}
