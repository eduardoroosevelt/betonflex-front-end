import React, { useState } from 'react'
import { FileUpload } from 'primereact/fileupload';
import { useDeleteOrdemServicoAnexoMutation, useGetOrdemServicoAnexoQuery } from '../../../ordemServicoAnexo/ordemServicoAnexoSlice';
import { OrdemServicoTabAnexoTable } from './OrdemServicoTabAnexoTable';
import { DataTableStateEvent } from 'primereact/datatable';

interface OrdemServicoTabClienteProps {
    ordemServicoId: number;
}

export function OrdemServicoTabAnexo({ ordemServicoId }: OrdemServicoTabClienteProps) {
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        rows: 5,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching, refetch } = useGetOrdemServicoAnexoQuery({ ordemServicoId: ordemServicoId });
    const [deleteAnexo, { error: deleteError, isSuccess: deleteSuccess, isLoading }] = useDeleteOrdemServicoAnexoMutation();

    async function handleDelete(ordemServicoAnexoId: number) {
        await deleteAnexo({ ordemServicoAnexoId });
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

    return (
        <div>
            <div className="card">
                <FileUpload
                    name="file"
                    url={`http://localhost:8083/ordemservicos/upload/${ordemServicoId}`}
                    multiple accept="*"
                    maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                    onUpload={() => refetch()}
                />
            </div>
            <OrdemServicoTabAnexoTable
                data={data}
                isFetching={isFetching || isLoading}
                handleDelete={handleDelete}
                rows={options.rows}
                rowsPerPage={[5, 10, 20]}
                handleOnPageChange={handleOnPageChange}
                handleFilterChange={handleFilterChange}
            />
        </div>
    )
}
