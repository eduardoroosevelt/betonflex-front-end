import React from 'react'
import { IProduto } from '../../../../types/IProduto';
import { Results } from '../../../../types/Results';
import { DataTableStateEvent } from 'primereact/datatable';
import { ColumnMeta, TabelaPaginado } from '../../../../components/TabelaPaginado';
import { Tag } from 'primereact/tag';


type Props = {
    data: Results<IProduto> | undefined;
    rows: number;
    rowsPerPage: number[];
    isFetching: boolean;

    handleOnPageChange: (page: DataTableStateEvent) => void;
    handleFilterChange: (filterModel: DataTableStateEvent) => void;
    handleDelete?: ((arg: IProduto) => void) | null;
    handleEdit: ((arg: IProduto) => void) | null;
    handleView?: ((arg: IProduto) => void) | null;
    handleAdicionar?: (() => void) | null;
};

export function ProdutoTable({
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
    const columns: ColumnMeta<IProduto>[] = [
        { field: "nome", header: "Nome" },
        { field: "descricao", header: "Descrição" },
        { field: "created", header: "Criado em" },
        { header: "Ativo?", body: (data) => data.ativo ? <Tag severity="success" value="ATIVO" className='w-full' /> : <Tag severity="danger" value="INATIVO" className='w-full' /> },
    ];

    return (
        <div className="col-12">
            <TabelaPaginado<IProduto>
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
