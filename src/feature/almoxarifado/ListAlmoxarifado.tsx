import React, { useEffect, useState } from 'react'
import { useDeleteAlmoxarifadoMutation, useGetAlmoxarifadosQuery } from './almoxarifadoSlice';
import { useSnackbar } from 'notistack';
import { CreateAlmoxarifado } from './CreateAlmoxarifado';
import { AlmoxarifadoTable } from './components/AlmoxarifadoTable';
import { DataTableStateEvent } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { IAlmoxarifado } from '../../types/IAlmoxarifado';

export function ListAlmoxarifado() {
  const { enqueueSnackbar } = useSnackbar();
  const [visibleAdicionar, setVisibleAdicionar] = useState(false);
  const navigation = useNavigate();
  const [options, setOptions] = useState({
    page: 0,
    search: "",
    rows: 5,
    rowsPerPage: [10, 20, 30],
  });
  const { data, isFetching, error } = useGetAlmoxarifadosQuery(options, { refetchOnMountOrArgChange: true });
  const [deleteAlmoxarigado, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteAlmoxarifadoMutation();

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar(`Almoxarifado deletado`, { variant: "success" });
    }
    if (deleteError) {
      enqueueSnackbar(`Almoxarigado não deletado`, { variant: "error" });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

  async function handleDeleteCategory(almox: IAlmoxarifado) {
    await deleteAlmoxarigado({ id: almox.id });
  }

  function handleEdit(almox: IAlmoxarifado) {
    navigation(`/app/cadastro/almoxarifado/edit/${almox.id}`);
  }

  function handleFilterChange(filterModel: DataTableStateEvent) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, search: "" });
    }

    const search = filterModel.quickFilterValues.join("");
    setOptions({ ...options, search });
  }

  function handleOnPageChange(page: DataTableStateEvent) {

    setOptions({
      ...options,
      page: page.page ? page.page : 0,
      rows: page.rows ? page.rows : 5,
    });
  }

  function handleAdicionar() {
    setVisibleAdicionar(true);
  }
  return (
    <div>
      <h2>Almoxarifado</h2>
      <AlmoxarifadoTable
        data={data}
        isFetching={isFetching}
        handleDelete={handleDeleteCategory}
        handleFilterChange={handleFilterChange}
        handleOnPageChange={handleOnPageChange}
        handleEdit={handleEdit}
        rows={options.rows}
        rowsPerPage={[5, 10, 20]}
        handleAdicionar={handleAdicionar}
      />
      {
        visibleAdicionar &&
        <CreateAlmoxarifado visibleAdicionar={visibleAdicionar} onHideAdicionar={() => { setVisibleAdicionar(false) }} />
      }
    </div>
  )
}
