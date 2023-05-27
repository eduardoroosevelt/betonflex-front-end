import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import { OrdemServico } from '../../types/OrdemServico';
import { Controller, useForm } from 'react-hook-form';
import { useCreateOrdemServicoMutation } from './OrdemServico.slice';
import { Sidebar } from 'primereact/sidebar';
import { WrapperComLabel } from '../../components/WrapperFormLabelInput';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { useGetTipoServicoListQuery } from '../tipoServico/TipoServicoSlice';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from "primereact/calendar";
import { OrdemServicoForm } from './OrdemServicoForm';

interface CreateOrdemServicoProps {
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
}

export function CreateOrdemServico({ visibleAdicionar, onHideAdicionar }: CreateOrdemServicoProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [createOrdemServico, status] = useCreateOrdemServicoMutation();
    const { register, handleSubmit, control, watch, setError, formState: { errors } } = useForm<OrdemServico>({
        defaultValues: {
            ordemServicoId: 0,
            ordemServicoNumero: "",
            tipoServico: {},
            ordemServicoStatus: 'NOVO',
            ordemServicoDataAbertura: (new Date()).toLocaleDateString('pt-BR'),
            ordemServicoValor: 0,
        }
    });

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Ordem de Serviço criado com  sucesso", { variant: "success" });
            onHideAdicionar();
        }
        if (status.error) {
            enqueueSnackbar("Ordem de Serviço não criado", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    async function onSubmit(data: OrdemServico) {
        await createOrdemServico(data);
    }


    return (
        <Sidebar onHide={onHideAdicionar} visible={visibleAdicionar} className="w-11 md:w-4" position='right' >
            <h3>Cadastrar Ordem de Serviço</h3>

            <OrdemServicoForm
                handleSubmit={handleSubmit(onSubmit)}
                erros={errors}
                register={register}
                control={control}
            />
        </Sidebar >
    )
}
