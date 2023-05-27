import React, { useEffect, useState } from 'react'
import OrdemServicoTabClienteTable from './OrdemServicoTabClienteTable';
import { DataTableStateEvent } from 'primereact/datatable';
import { OrdemServicoTabClienteCreate } from './OrdemServicoTabClienteCreate';
import { enqueueSnackbar } from 'notistack';
import { useDeleteOrdemServicoClienteMutation, useGetOrdemServicoClientePelaOrdemServicoQuery } from '../../../ordemServicoCliente/OrdemServicoClienteSlice';

interface OrdemServicoTabClienteProps {
    ordemServicoId: number;
}
export function OrdemServicoTabCliente({ ordemServicoId }: OrdemServicoTabClienteProps) {
    const [visibleAdicionar, setVisibleAdicionar] = useState(false);
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        rows: 5,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching } = useGetOrdemServicoClientePelaOrdemServicoQuery({ ordemServicoId: ordemServicoId, ...options })
    const [deleteCliente, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteOrdemServicoClienteMutation();

    useEffect(() => {

        if (deleteSuccess) {
            enqueueSnackbar(`Cliente deletado`, { variant: "success" });
        }
        if (deleteError) {
            enqueueSnackbar(`Cliente não deletado`, { variant: "error" });
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

    function handleDelete(ordemServicoClienteId: number) {
        deleteCliente({ ordemServicoClienteId: ordemServicoClienteId });
    }
    return (
        <div>
            <OrdemServicoTabClienteTable
                data={data}
                isFetching={isFetching}
                handleFilterChange={handleFilterChange}
                handleOnPageChange={handleOnPageChange}
                handleDelete={handleDelete}
                rows={options.rows}
                rowsPerPage={[5, 10, 20]}
                handleAdicionar={handleAdicionar}
            />
            {visibleAdicionar && <OrdemServicoTabClienteCreate visibleAdicionar={visibleAdicionar} ordemServicoId={ordemServicoId} onHideAdicionar={() => setVisibleAdicionar(false)} />}
        </div>
    )
}
