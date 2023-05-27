import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import { useVincularClienteOrdemServicoMutation } from '../../../ordemServicoCliente/OrdemServicoClienteSlice';
import { Controller, useForm } from 'react-hook-form';
import { OrdemServicoCliente } from '../../../../types/OrdemServicoCliente';
import { useGetClienteNotInOrdemServicoListQuery } from '../../../cliente/ClienteSlice';
import { WrapperComLabel } from '../../../../components/WrapperFormLabelInput';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

interface OrdemServicoTabClienteCreateProps {
    ordemServicoId: number
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
}
export function OrdemServicoTabClienteCreate({ ordemServicoId, visibleAdicionar, onHideAdicionar }: OrdemServicoTabClienteCreateProps) {

    const { enqueueSnackbar } = useSnackbar();
    const [createOrdemServicoCliente, status] = useVincularClienteOrdemServicoMutation();
    const { data: listClientes, isFetching } = useGetClienteNotInOrdemServicoListQuery({ ordemServicoId })
    const { register, handleSubmit, control, watch, setError, formState: { errors } } = useForm<OrdemServicoCliente>({
        defaultValues: {
            cliente: {
                clienteId: 0,
            },
            ordemServico: {
                ordemServicoId
            }
        }
    });

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Cliente vinculado com  sucesso", { variant: "success" });
            onHideAdicionar();
        }
        if (status.error) {
            enqueueSnackbar("Cliente não vinculado", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    function onSubmit(data: OrdemServicoCliente) {
        createOrdemServicoCliente(data)
    }

    return (
        <Sidebar onHide={onHideAdicionar} visible={visibleAdicionar} className="w-11 md:w-4" position='right' >
            <h4>Vincular Cliente nesta ordem de serviço</h4>
            <form className='grid' onSubmit={handleSubmit(onSubmit)}>
                <WrapperComLabel cols='12' label='Cliente' isObrigatorio>
                    <Controller
                        name="cliente"
                        control={control}
                        rules={{ required: 'Cliente é obrigatório' }}
                        render={({ field, fieldState }) => (
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="clienteNome"
                                placeholder="Selecione o cliente"
                                options={listClientes}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames('w-full', { 'p-invalid': fieldState.error })}
                            />
                        )}
                    />
                </WrapperComLabel>
                <Button type="submit" severity="success" label="Salvar" className="col-12" />
            </form>
        </Sidebar>
    )
}
