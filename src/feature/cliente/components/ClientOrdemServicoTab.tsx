import React, { useState } from 'react'
import { useGetOrdemServicoPorClientePageQuery } from '../../ordemServico/OrdemServico.slice'
import { ClientOrdemServicoTabTable } from './ClientOrdemServicoTabTable';
import { DataTableStateEvent } from 'primereact/datatable';
import { ClientOrdemServicoTabCreate } from './ClientOrdemServicoTabCreate';
import { useGetOrdemServicoClientePorClientePageQuery } from '../../ordemServicoCliente/OrdemServicoClienteSlice';

interface ClientOrdemServicoTabProps {
    clienteId: number
}
export function ClientOrdemServicoTab({ clienteId }: ClientOrdemServicoTabProps) {
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        rows: 5,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching, error } = useGetOrdemServicoClientePorClientePageQuery({ ...options, clienteId })
    const [visibleAdicionar, setVisibleAdicionar] = useState(false);

    async function handleDelete(clienteId: number) {

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

            <ClientOrdemServicoTabTable
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
                visibleAdicionar && <ClientOrdemServicoTabCreate visibleAdicionar={visibleAdicionar} clienteId={clienteId} onHideAdicionar={() => { setVisibleAdicionar(false) }} />
            }
        </div>
    )
}
