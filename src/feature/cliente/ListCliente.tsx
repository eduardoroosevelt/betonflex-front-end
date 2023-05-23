import React, { useEffect, useState } from 'react'
import { ClientTable } from './components/ClienteTable'
import CreateCliente from './CreateCliente'
import { useSnackbar } from 'notistack';
import { useDeleteClienteMutation, useGetClientesQuery } from './ClienteSlice';
import { DataTableStateEvent } from 'primereact/datatable';

export default function ListCliente() {
    const { enqueueSnackbar } = useSnackbar();
    const [visibleAdicionar, setVisibleAdicionar] = useState(false);
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        rows: 5,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching, error } = useGetClientesQuery(options, { refetchOnMountOrArgChange: true });
    const [deleteCliente, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteClienteMutation();

    useEffect(() => {
        if (deleteSuccess) {
            enqueueSnackbar(`Cliente deletado`, { variant: "success" });
        }
        if (deleteError) {
            enqueueSnackbar(`Cliente não deletado`, { variant: "error" });
        }
    }, [deleteSuccess, deleteError, enqueueSnackbar]);

    async function handleDelete(clienteId: number) {
        await deleteCliente({ clienteId });
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
            <h3>Clientes</h3>
            <ClientTable
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
                <CreateCliente visibleAdicionar={visibleAdicionar} onHideAdicionar={() => { setVisibleAdicionar(false) }} />
            }
        </div>
    )
}
