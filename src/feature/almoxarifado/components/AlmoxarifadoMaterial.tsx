import React, { useEffect, useState } from 'react'
import { useDeleteAlmoxarifadoMaterialMutation, useGetPageAlmoxarifadoMateriaisPorAlmoxarifadoQuery } from '../almoxarifadoMaterialSlice'
import AlmoxarifadoMaterialTable from './AlmoxarifadoMaterialTable';
import { CreateAlmoxarifadoMaterial } from './CreateAlmoxarifadoMaterial';
import { useSnackbar } from 'notistack';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

interface AlmoxarifadoMaterialProps {
    almoxarifadoId: number
}
export function AlmoxarifadoMaterial({ almoxarifadoId }: AlmoxarifadoMaterialProps) {
    const { enqueueSnackbar } = useSnackbar();
    const navigation = useNavigate();
    const [visibleAdicionar, setVisibleAdicionar] = useState(false);
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        rows: 5,
        rowsPerPage: [10, 20, 30],
    });
    const { data, isFetching, error } = useGetPageAlmoxarifadoMateriaisPorAlmoxarifadoQuery({ ...options, almoxarifadoId })
    const [deleteMaterial, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteAlmoxarifadoMaterialMutation()

    const handleFilterChange = (filterModel: any) => { }
    const handleOnPageChange = (page: any) => { }
    const handleAdicionar = () => {
        setVisibleAdicionar(true);
    }

    useEffect(() => {
        if (deleteSuccess) {
            enqueueSnackbar(`Material deletado`, { variant: "success" });
        }
        if (deleteError) {
            enqueueSnackbar(`Material não deletado`, { variant: "error" });
        }
    }, [deleteSuccess, deleteError, enqueueSnackbar]);

    const handleDelete = async (almoxarifadoMaterialId: number) => {
        await deleteMaterial({ almoxarifadoMaterialId })
    }


    function goBack() {
        navigation('/app/cadastro/almoxarifado')
    }
    return (
        <div className='grid '>
            <div className="col-12">

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
            </div>
            <Button label="Voltar" onClick={goBack} className="col-12 md:col-2" />

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
