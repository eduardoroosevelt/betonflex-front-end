
import { useSnackbar } from 'notistack';
import { Sidebar } from 'primereact/sidebar'
import React, { useEffect } from 'react'
import { useCreateOrdemServicoMutation } from '../../ordemServico/OrdemServico.slice';
import { useGetTipoServicoListQuery } from '../../tipoServico/TipoServicoSlice';
import { Controller, useForm } from 'react-hook-form';
import { OrdemServico } from '../../../types/OrdemServico';
import { WrapperComLabel } from '../../../components/WrapperFormLabelInput';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { useCreateOrdemServicoClienteMutation } from '../../ordemServicoCliente/OrdemServicoClienteSlice';
import { OrdemServicoCliente } from '../../../types/OrdemServicoCliente';

interface ClientOrdemServicoTabProps {
    clienteId: number
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
}

export function ClientOrdemServicoTabCreate({ clienteId, onHideAdicionar, visibleAdicionar }: ClientOrdemServicoTabProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [createOrdemServicoCliente, status] = useCreateOrdemServicoClienteMutation();
    const { data: listTipoServico } = useGetTipoServicoListQuery();
    const { register, handleSubmit, control, watch, setError, formState: { errors } } = useForm<OrdemServicoCliente>({
        defaultValues: {
            cliente: {
                clienteId: clienteId,
            },
            ordemServico: {
                ordemServicoId: 0,
                ordemServicoNumero: "",
                tipoServico: {},
                ordemServicoStatus: 'NOVO',
                ordemServicoDataAbertura: (new Date()).toLocaleDateString('pt-BR'),
                ordemServicoValor: 0,
            }
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

    async function onSubmit(data: OrdemServicoCliente) {
        await createOrdemServicoCliente(data);
    }


    return (
        <Sidebar onHide={onHideAdicionar} visible={visibleAdicionar} className="w-11 md:w-4" position='right' blockScroll>
            <h3>Cadastrar Ordem de Serviço</h3>

            <form className='grid' onSubmit={handleSubmit(onSubmit)}>
                <WrapperComLabel cols='12' label='N° da Ordem' >
                    <InputText {...register("ordemServico.ordemServicoNumero")} className={classNames('w-full', { 'p-invalid': errors.ordemServico?.ordemServicoNumero })} />
                    {errors.ordemServico?.ordemServicoNumero && (
                        <p role="alert" style={{ color: 'var(--red-700)' }}>
                            {errors.ordemServico?.ordemServicoNumero?.message}
                        </p>
                    )}
                </WrapperComLabel>

                <WrapperComLabel cols='12' label='Data da Abertura' >
                    <Controller
                        name="ordemServico.ordemServicoDataAbertura"
                        control={control}
                        rules={{ required: 'Data é obrigatório.' }}
                        render={({ field, fieldState }) => {
                            const [D, M, A] = field.value.split('/')
                            const date = new Date(`${M}/${D}/${A}`)

                            return (<>
                                <Calendar
                                    inputId={field.name}
                                    value={date}
                                    onChange={(e) => {
                                        let data = e.value as Date
                                        field.onChange(data.toLocaleDateString('pt-BR'))
                                    }}
                                    dateFormat="dd/mm/yy"
                                    className={classNames('w-full', { 'p-invalid': fieldState.error })}
                                    appendTo="self"
                                />
                                {
                                    errors.ordemServico?.ordemServicoDataAbertura && (
                                        <p role="alert" style={{ color: 'var(--red-700)' }}>
                                            {errors.ordemServico?.ordemServicoDataAbertura?.message}
                                        </p>
                                    )
                                }
                            </>)
                        }}
                    />
                </WrapperComLabel>

                <WrapperComLabel cols='12' label='Tipo de Serviço' isObrigatorio>
                    <Controller
                        name="ordemServico.tipoServico"
                        control={control}
                        rules={{ required: 'Tipo Serviço é obrigatório' }}
                        render={({ field, fieldState }) => (
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="tipoServicoNome"
                                placeholder="Selecione o tipo de serviço"
                                options={listTipoServico}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames('w-full', { 'p-invalid': fieldState.error })}
                            />
                        )}
                    />
                </WrapperComLabel>

                <WrapperComLabel cols='12' label='Valor da Ordem' >
                    <Controller
                        name="ordemServico.ordemServicoValor"
                        control={control}
                        rules={{
                            required: 'Entre com um valor acima de 0.',
                            validate: (value) => (value >= 0) || 'Entre com um valor acima de 0.'
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <InputNumber
                                    mode="currency"
                                    currency="BRL"
                                    locale="pt-BR"
                                    id={field.name}
                                    inputRef={field.ref}
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    onValueChange={(e) => field.onChange(e.value)}
                                    useGrouping={false}
                                    inputClassName={classNames('w-full', { 'p-invalid': fieldState.error })}
                                    className='w-full'
                                />
                                {
                                    errors.ordemServico?.ordemServicoValor && (
                                        <p role="alert" style={{ color: 'var(--red-700)' }}>
                                            {errors.ordemServico?.ordemServicoValor?.message}
                                        </p>
                                    )
                                }
                            </>
                        )}
                    />
                </WrapperComLabel>

                <Button type="submit" severity="success" label="Salvar" className="col-12" />
            </form>
        </Sidebar>
    )
}
