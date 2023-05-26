import { useSnackbar } from 'notistack';
import { DataTableStateEvent } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import { useDeleteOrdemServicoMutation, useGetOrdemServicosQuery } from './OrdemServico.slice';
import { OrdemServicoTable } from './components/OrdemServicoTable';
import { CreateOrdemServico } from './CreateOrdemServico';

export default function ListOrdemServico() {
  const { enqueueSnackbar } = useSnackbar();
  const [visibleAdicionar, setVisibleAdicionar] = useState(false);
  const [options, setOptions] = useState({
    page: 0,
    search: "",
    rows: 5,
    rowsPerPage: [10, 20, 30],
  });
  const { data, isFetching, error } = useGetOrdemServicosQuery(options, { refetchOnMountOrArgChange: true });
  const [deleteOrdemServico, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteOrdemServicoMutation();

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar(`Ordem de Serviço deletado`, { variant: "success" });
    }
    if (deleteError) {
      enqueueSnackbar(`Ordemde Serviço não deletado`, { variant: "error" });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

  async function handleDelete(ordemServicoId: number) {
    await deleteOrdemServico({ ordemServicoId });
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
      <h3>Ordem de Serviço</h3>
      <OrdemServicoTable
        data={data}
        isFetching={isFetching}
        handleDelete={handleDelete}
        handleFilterChange={handleFilterChange}
        handleOnPageChange={handleOnPageChange}
        rows={options.rows}
        rowsPerPage={[5, 10, 20]}
        handleAdicionar={handleAdicionar}
      />
      {
        visibleAdicionar &&
        <CreateOrdemServico visibleAdicionar={visibleAdicionar} onHideAdicionar={() => { setVisibleAdicionar(false) }} />
      }
    </div>
  )
}
