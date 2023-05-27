import React, { useEffect } from 'react'
import { useGetClienteQuery, useUpdateClienteMutation } from './ClienteSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useUpdateMaterialMutation } from '../materiais/materialSlice';
import { useForm } from 'react-hook-form';
import { Cliente } from '../../types/Cliente';
import { WrapperComLabel } from '../../components/WrapperFormLabelInput';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { TabPanel, TabView } from 'primereact/tabview';
import { ClientOrdemServicoTab } from './components/ClientOrdemServicoTab';

export function EditCliente() {
    const id = useParams().id;
    const { enqueueSnackbar } = useSnackbar();
    const { data: cliente, isFetching, refetch } = useGetClienteQuery({ clienteId: parseInt(id!) })
    const [updateCliente, status] = useUpdateClienteMutation();
    const navigation = useNavigate();
    const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm<Cliente>({
        defaultValues: {
            clienteId: 0,
            clienteNome: "",
            clienteDocumento: "",
            clienteCreateat: "",
        }
    });

    useEffect(() => {
        if (cliente) {
            setValue("clienteId", cliente?.clienteId)
            setValue("clienteNome", cliente?.clienteNome)
            setValue("clienteDocumento", cliente?.clienteDocumento)
            setValue("clienteCreateat", cliente?.clienteCreateat)
        }
    }, [cliente])

    useEffect(() => {
        if (status.isSuccess) {
            setTimeout(() => {
                goBack()
            }, 0);
            enqueueSnackbar("Material alterado com sucesso", { variant: "success" });
        }
        if (status.error) {
            enqueueSnackbar("Erro  ao alterar o material", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    async function onSubmit(data: Cliente) {
        await updateCliente(data);
    }

    function goBack() {
        navigation('/app/cadastro/cliente')
    }


    return (
        <div>
            <h3>Editar Cliente</h3>

            <TabView>
                <TabPanel header="Dados Gerais">
                    <form className='grid gap-2' onSubmit={handleSubmit(onSubmit)}>
                        <WrapperComLabel cols='12' label='Nome' >
                            <InputText {...register("clienteNome")} className={classNames('w-full', { 'p-invalid': errors.clienteNome })} />
                            {errors.clienteNome && (
                                <p role="alert" style={{ color: 'var(--red-700)' }}>
                                    {errors.clienteNome?.message}
                                </p>
                            )}
                        </WrapperComLabel>

                        <WrapperComLabel cols='12' label='Documento' >
                            <InputText {...register("clienteDocumento")} className={classNames('w-full')} />
                        </WrapperComLabel>
                        <Button type="submit" severity="success" label="Salvar" className="col-12 md:col-2" />
                        <Button label="Voltar" onClick={goBack} className="col-12 md:col-2" />
                    </form>
                </TabPanel>

                <TabPanel header="Ordem de Serviços">
                    <ClientOrdemServicoTab clienteId={parseInt(id!)} />
                </TabPanel>
            </TabView>

        </div>
    )
}
