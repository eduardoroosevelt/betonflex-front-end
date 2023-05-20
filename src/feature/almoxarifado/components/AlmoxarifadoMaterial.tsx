import React, { useState } from 'react'
import { useGetAlmoxarifadoMaterialQuery, useGetPageAlmoxarifadoMateriaisQuery } from '../almoxarifadoMaterialSlice'
import AlmoxarifadoMaterialTable from './AlmoxarifadoMaterialTable';
import { CreateAlmoxarifadoMaterial } from './CreateAlmoxarifadoMaterial';
import { useSnackbar } from 'notistack';

interface AlmoxarifadoMaterialProps {
    almoxarifadoId: number
}
export function AlmoxarifadoMaterial({ almoxarifadoId }: AlmoxarifadoMaterialProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [visibleAdicionar, setVisibleAdicionar] = useState(false);
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        rows: 5,
        rowsPerPage: [10, 20, 30],
    });

    const handleFilterChange = (filterModel: any) => { }
    const handleOnPageChange = (page: any) => { }
    const handleAdicionar = () => {
        setVisibleAdicionar(true);
    }
    const handleDelete = (almoxarifadoId: number) => { }

    const { data, isFetching, error } = useGetPageAlmoxarifadoMateriaisQuery({ ...options, almoxarifadoId })


    return (
        <div>
            <AlmoxarifadoMaterialTable
                data={data}
                isFetching={isFetching}
                rows={options.rows}
                rowsPerPage={[5, 10, 20]}
                handleDelete={handleDelete}
                handleFilterChange={handleFilterChange}
                handleOnPageChange={handleOnPageChange}
                handleAdicionar={handleAdicionar}
            />

            <CreateAlmoxarifadoMaterial
                visibleAdicionar={visibleAdicionar}
                onHideAdicionar={() => setVisibleAdicionar(false)}
                almoxarifadoId={almoxarifadoId}
            />
        </div>
    )
}
