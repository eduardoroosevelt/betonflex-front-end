import { DataTableRowClickEvent, DataTableStateEvent } from 'primereact/datatable';

import { Results } from '../../../types/Results';
import { IAlmoxarifado } from '../../../types/IAlmoxarifado';
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

  const columns: ColumnMeta<IAlmoxarifado>[] = [
    { field: 'nome', header: 'Nome' },
    { field: 'descricao', header: 'Descrição' },
    { field: 'created', header: 'Criado em' },
    { header: "Ativo?", body: (data) => data.ativo ? <Tag severity="success" value="ATIVO" className='w-full' /> : <Tag severity="danger" value="INATIVO" className='w-full' /> },
  ];

  function handleRowClick(event: DataTableRowClickEvent) {
    handleEdit && handleEdit(event.data as IAlmoxarifado)
  }

  return (
    <div className="col-12">
      <TabelaPaginado<IAlmoxarifado>
        data={data}
        columns={columns}
        isFetching={isFetching}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleRowClick={handleRowClick}
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
