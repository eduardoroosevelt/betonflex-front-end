import React, { useEffect, useState } from 'react'
import { TipoServicoTable } from './components/TipoServicoTable'
import { useSnackbar } from 'notistack';
import { useDeleteTipoServicoMutation, useGetTipoServicosQuery } from './TipoServicoSlice';
import { DataTableStateEvent } from 'primereact/datatable';
import { CreateTipoServico } from './CreateTipoServico';

export function ListTipoServico() {
    const { enqueueSnackbar } = useSnackbar();
    const [visibleAdicionar, setVisibleAdicionar] = useState(false);
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        rows: 5,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching, error } = useGetTipoServicosQuery(options, { refetchOnMountOrArgChange: true });
    const [deleteTipoServico, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteTipoServicoMutation();

    useEffect(() => {
        if (deleteSuccess) {
            enqueueSnackbar(`Tipo de Serviço deletado`, { variant: "success" });
        }
        if (deleteError) {
            enqueueSnackbar(`Tipo de Serviço não deletado`, { variant: "error" });
        }
    }, [deleteSuccess, deleteError, enqueueSnackbar]);

    async function handleDelete(tipoServicoId: number) {
        await deleteTipoServico({ tipoServicoId });
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
            <h3>Tipo de Serviços</h3>
            <TipoServicoTable
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
                <CreateTipoServico visibleAdicionar={visibleAdicionar} onHideAdicionar={() => { setVisibleAdicionar(false) }} />
            }
        </div>
    )
}
