import React, { useState } from 'react'
import { useGetPageAlmoxarifadoMateriaisPorAlmoxarifadoQuery } from '../almoxarifadoMaterialSlice'
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
    const { data, isFetching, error } = useGetPageAlmoxarifadoMateriaisPorAlmoxarifadoQuery({ ...options, almoxarifadoId })

    const handleFilterChange = (filterModel: any) => { }
    const handleOnPageChange = (page: any) => { }
    const handleAdicionar = () => {
        setVisibleAdicionar(true);
    }
    const handleDelete = (almoxarifadoId: number) => { }



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

            {
                visibleAdicionar &&
                <CreateAlmoxarifadoMaterial
                    visibleAdicionar={visibleAdicionar}
                    onHideAdicionar={() => setVisibleAdicionar(false)}
                    almoxarifadoId={almoxarifadoId}
                />
            }
        </div>
    )
}
