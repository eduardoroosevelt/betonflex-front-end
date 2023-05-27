import { TabPanel, TabView } from 'primereact/tabview'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useGetOrdemServicoQuery, useUpdateOrdemServicoMutation } from './OrdemServico.slice';
import { useForm } from 'react-hook-form';
import { OrdemServico } from '../../types/OrdemServico';
import { OrdemServicoForm } from './components/OrdemServicoForm';
import { useSnackbar } from 'notistack';

export default function EditOrdemServico() {
    const { enqueueSnackbar } = useSnackbar();
    const id = useParams().id;
    const { data: ordemServico, isFetching } = useGetOrdemServicoQuery({ ordemServicoId: parseInt(id!) })
    const [updateOrdemServico, status] = useUpdateOrdemServicoMutation();

    const { register, handleSubmit, control, watch, setError, setValue, formState: { errors } } = useForm<OrdemServico>({
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
        if (ordemServico) {
            setValue("ordemServicoId", ordemServico.ordemServicoId);
            setValue("ordemServicoNumero", ordemServico.ordemServicoNumero);
            setValue("tipoServico", ordemServico.tipoServico);
            setValue("ordemServicoStatus", ordemServico.ordemServicoStatus);
            setValue("ordemServicoDataAbertura", ordemServico.ordemServicoDataAbertura);
            setValue("ordemServicoValor", ordemServico.ordemServicoValor);

        }
    }, [ordemServico])

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Ordem de Serviço atualizado com  sucesso", { variant: "success" });
        }
        if (status.error) {
            enqueueSnackbar("Ordem de Serviço não atualizado", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess])

    async function onSubmit(data: OrdemServico) {
        await updateOrdemServico(data);
    }

    return (
        <div>
            <h3>Editar Ordem de Serviço N° {ordemServico?.ordemServicoNumero}</h3>
            <TabView>
                <TabPanel header="Dados Gerais">
                    <OrdemServicoForm
                        handleSubmit={handleSubmit(onSubmit)}
                        erros={errors}
                        register={register}
                        control={control}
                    />
                </TabPanel>
                <TabPanel header="Cliente">
                    <h1>a</h1>
                </TabPanel>
                <TabPanel header="Materiais">
                    <h1>a</h1>
                </TabPanel>
                <TabPanel header="Anexos">
                    <h1>a</h1>
                </TabPanel>
            </TabView>
        </div>
    )
}
