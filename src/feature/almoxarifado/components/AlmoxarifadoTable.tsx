import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableRowClickEvent, DataTableSelectionChangeEvent, DataTableStateEvent } from 'primereact/datatable';

import { useNavigate } from 'react-router-dom';
import { Results } from '../../../types/Results';
import { Almoxarifado } from '../../../types/Almoxarifado';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';

type Props = {
  data: Results<Almoxarifado> | undefined;
  rows: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: DataTableStateEvent) => void;
  handleFilterChange: (filterModel: DataTableStateEvent) => void;
  handleDelete: (id: number) => void;
  handleAdicionar: () => void;
};


interface ColumnMeta {
  field: string;
  header: string;
}

export function AlmoxarifadoTable({ data, rows, isFetching, rowsPerPage, handleOnPageChange, handleFilterChange, handleDelete, handleAdicionar }: Props) {

  const navigation = useNavigate();
  const [visibleConfirmExcluir, setVisibleConfirmExcluir] = useState(false);
  const [selected, setSelected] = useState<Almoxarifado | null>();

  const columns: ColumnMeta[] = [
    { field: 'almoxarifadoNome', header: 'Nome' },
    { field: 'almoxarifadoDescricao', header: 'Descrição' },
    { field: 'almoxarifadoAtivo', header: 'Ativo?' },
    { field: 'almoxarifadoCreateat', header: 'Criado em' }
  ];

  function renderHeader() {
    return <Button label={"Adicionar"} icon="pi pi-plus" onClick={handleAdicionar} />
  }

  function handleEdit(parm: DataTableRowClickEvent) {

    navigation(`/app/cadastro/almoxarifado/edit/${parm.data.almoxarifadoId}`);
  }

  const first = data?.number && data?.size ? data?.number * data?.size : 0;

  function botoes(data: Almoxarifado) {
    return (
      <div>
        <Button label={"Excluir"} icon="pi pi-trash" severity='danger' onClick={(e) => onExcluir(e, data)} />
      </div>
    )
  }

  const onExcluir = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, rowData: Almoxarifado) => {
    event.preventDefault();
    setSelected(rowData);
    setVisibleConfirmExcluir(true);
  };

  const confirmarExclucao = () => {
    setVisibleConfirmExcluir(false);
    handleDelete && selected && handleDelete(selected?.almoxarifadoId);
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
        dataKey='almoxarifadoId'
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
        selection={selected || []}
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
