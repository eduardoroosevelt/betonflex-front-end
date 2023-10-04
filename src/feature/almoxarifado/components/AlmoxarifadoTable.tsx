import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableRowClickEvent, DataTableSelectionChangeEvent, DataTableStateEvent } from 'primereact/datatable';

import { useNavigate } from 'react-router-dom';
import { Results } from '../../../types/Results';
import { IAlmoxarifado } from '../../../types/IAlmoxarifado';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { ColumnMeta, TabelaPaginado } from '../../../components/TabelaPaginado';

type Props = {
  data: Results<IAlmoxarifado> | undefined;
  rows: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: DataTableStateEvent) => void;
  handleFilterChange: (filterModel: DataTableStateEvent) => void;
  handleAdicionar: () => void;
  handleDelete?: ((arg: IAlmoxarifado) => void) | null;
  handleEdit?: ((arg: IAlmoxarifado) => void) | null;
  handleView?: ((arg: IAlmoxarifado) => void) | null;
};



export function AlmoxarifadoTable({
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
    { field: 'nome', header: 'Nome' },
    { field: 'descricao', header: 'Descrição' },
    { field: 'created', header: 'Criado em' },
    { header: "Ativo?", body: (data) => data.ativo ? <Tag severity="success" value="ATIVO" className='w-full' /> : <Tag severity="danger" value="INATIVO" className='w-full' /> },
  ];

  return (
    <div className="col-12">
      <TabelaPaginado<IAlmoxarifado>
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
