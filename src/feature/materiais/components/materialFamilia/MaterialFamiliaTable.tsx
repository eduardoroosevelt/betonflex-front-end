import React from 'react'
import { ColumnMeta, TabelaPaginado } from '../../../../components/TabelaPaginado';
import { Results } from '../../../../types/Results';
import { DataTableStateEvent } from 'primereact/datatable';
import { IMaterialFamilia } from '../../../../types/IMaterialFamilia';
import { Tag } from 'primereact/tag';

type Props = {
    data: Results<IMaterialFamilia> | undefined;
    rows: number;
    rowsPerPage: number[];
    isFetching: boolean;

    handleOnPageChange: (page: DataTableStateEvent) => void;
    handleFilterChange: (filterModel: DataTableStateEvent) => void;
    handleDelete?: ((arg: IMaterialFamilia) => void) | null;
    handleEdit: ((arg: IMaterialFamilia) => void) | null;
    handleView?: ((arg: IMaterialFamilia) => void) | null;
    handleAdicionar?: (() => void) | null;
};

export default function MaterialFamiliaTable({
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
        { field: "nome", header: "Nome" },
        { field: "descricao", header: "Descrição" },
        { field: "created", header: "Criado em" },
        { header: "Ativo?", body: (data) => data.ativo ? <Tag severity="success" value="ATIVO" className='w-full' /> : <Tag severity="danger" value="INATIVO" className='w-full' /> },
    ];

    return (
        <div className="col-12">
            <TabelaPaginado<IMaterialFamilia>
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
