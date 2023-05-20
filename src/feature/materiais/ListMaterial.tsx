import React, { useEffect, useState } from 'react'
import { useDeleteMaterialMutation, useGetMaterialsQuery } from './materialSlice';
import { useSnackbar } from 'notistack';
import { CreateMaterial } from './CreateMaterial';
import { MaterialTable } from './components/MaterialTable';
import { DataTableStateEvent } from 'primereact/datatable';

export function ListMaterial() {
  const { enqueueSnackbar } = useSnackbar();
  const [visibleAdicionar, setVisibleAdicionar] = useState(false);
  const [options, setOptions] = useState({
    page: 0,
    search: "",
    rows: 5,
    rowsPerPage: [10, 20, 30],
  });
  const { data, isFetching, error } = useGetMaterialsQuery(options, { refetchOnMountOrArgChange: true });
  const [deleteMaterial, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteMaterialMutation();

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar(`Material deletado`, { variant: "success" });
    }
    if (deleteError) {
      enqueueSnackbar(`Material não deletado`, { variant: "error" });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

  async function handleDeleteMaterial(materialId: number) {
    await deleteMaterial({ materialId });
  }


  function handleFilterChange(filterModel: DataTableStateEvent) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, search: "" });
    }

    const search = filterModel.quickFilterValues.join("");
    setOptions({ ...options, search });
  }

  function handleOnPageChange(page: DataTableStateEvent) {
    console.log(page);

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
      <h2>Material</h2>
      <MaterialTable
        data={data}
        isFetching={isFetching}
        handleDelete={handleDeleteMaterial}
        handleFilterChange={handleFilterChange}
        handleOnPageChange={handleOnPageChange}
        rows={options.rows}
        rowsPerPage={[5, 10, 20]}
        handleAdicionar={handleAdicionar}
      />
      {
        visibleAdicionar &&
        <CreateMaterial visibleAdicionar={visibleAdicionar} onHideAdicionar={() => { setVisibleAdicionar(false) }} />
      }
    </div>
  )
}
