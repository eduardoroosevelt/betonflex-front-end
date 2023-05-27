import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';
import { DataTableStateEvent } from 'primereact/datatable';
import { useDeleteFuncionarioMutation, useGetFuncionariosQuery } from './FuncionarioSlice';
import { FuncionarioTable } from './components/FuncionarioTable';
import { CreateFuncionario } from './CreateFuncionario';

export function ListFuncionario() {
    const { enqueueSnackbar } = useSnackbar();
    const [visibleAdicionar, setVisibleAdicionar] = useState(false);
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        rows: 5,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching, error } = useGetFuncionariosQuery(options, { refetchOnMountOrArgChange: true });
    const [deleteFuncionario, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteFuncionarioMutation();

    useEffect(() => {
        if (deleteSuccess) {
            enqueueSnackbar(`Funcionário deletado`, { variant: "success" });
        }
        if (deleteError) {
            enqueueSnackbar(`Funcionário não deletado`, { variant: "error" });
        }
    }, [deleteSuccess, deleteError, enqueueSnackbar]);

    async function handleDelete(funcionarioId: number) {
        await deleteFuncionario({ funcionarioId });
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
            <h2>Funcionário</h2>
            <FuncionarioTable
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
                <CreateFuncionario visibleAdicionar={visibleAdicionar} onHideAdicionar={() => { setVisibleAdicionar(false) }} />
            }
        </div>
    )
}
