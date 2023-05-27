import React, { useEffect, useState } from 'react'
import { useDeleteOrdemServicoMaterialMutation, useGetOrdemServicoMaterialPelaOrdemServicoQuery } from '../../../ordemServicoMaterial/OrdemServicoMaterial';
import { enqueueSnackbar } from 'notistack';
import { DataTableStateEvent } from 'primereact/datatable';
import { OrdemServicoTabMaterialTable } from './OrdemServicoTabMaterialTable';
import { OrdemServicoTabMaterialCreate } from './OrdemServicoTabMaterialCreate';

interface OrdemServicoTabMaterialProps {
    ordemServicoId: number;
}
export function OrdemServicoTabMaterial({ ordemServicoId }: OrdemServicoTabMaterialProps) {
    const [visibleAdicionar, setVisibleAdicionar] = useState(false);
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        rows: 5,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching } = useGetOrdemServicoMaterialPelaOrdemServicoQuery({ ordemServicoId: ordemServicoId, ...options })
    const [deleteMaterial, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteOrdemServicoMaterialMutation();

    useEffect(() => {

        if (deleteSuccess) {
            enqueueSnackbar(`Material deletado`, { variant: "success" });
        }
        if (deleteError) {
            enqueueSnackbar(`ClieMaterialnte não deletado`, { variant: "error" });
        }
    }, [deleteSuccess, deleteError, enqueueSnackbar]);

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

    function handleDelete(ordemServicoMaterialId: number) {
        deleteMaterial({ ordemServicoMaterialId: ordemServicoMaterialId });
    }
    return (
        <div>
            <OrdemServicoTabMaterialTable
                data={data}
                isFetching={isFetching}
                handleFilterChange={handleFilterChange}
                handleOnPageChange={handleOnPageChange}
                handleDelete={handleDelete}
                rows={options.rows}
                rowsPerPage={[5, 10, 20]}
                handleAdicionar={handleAdicionar}
            />
            {visibleAdicionar && <OrdemServicoTabMaterialCreate visibleAdicionar={visibleAdicionar} ordemServicoId={ordemServicoId} onHideAdicionar={() => setVisibleAdicionar(false)} />}
        </div>
    )
}
