import React from 'react'
import { IProduto } from '../../types/IProduto';
import { Results } from '../../types/Results';
import { DataTableStateEvent } from 'primereact/datatable';
import { ColumnMeta, TabelaPaginado } from '../TabelaPaginado';
import { Tag } from 'primereact/tag';

type Props = {
    data: Results<IProduto> | undefined;
    rows: number;
    rowsPerPage: number[];
    isFetching: boolean;

    handleOnPageChange: (page: DataTableStateEvent) => void;
    handleFilterChange: (filterModel: DataTableStateEvent) => void;

};

export function PromptPesquisarProdutoTable({ data, rows, rowsPerPage, isFetching, handleOnPageChange, handleFilterChange }: Props) {


    const columns: ColumnMeta[] = [
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
                handleFilterChange={handleFilterChange}
                handleOnPageChange={handleOnPageChange}
                rows={rows}
                rowsPerPage={rowsPerPage}
            />
        </div>
    )
}
