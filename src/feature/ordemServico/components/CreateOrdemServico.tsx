import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import { OrdemServico } from '../../../types/OrdemServico';
import { Controller, useForm } from 'react-hook-form';
import { useCreateOrdemServicoMutation } from '../OrdemServico.slice';
import { Sidebar } from 'primereact/sidebar';
import { WrapperComLabel } from '../../../components/WrapperFormLabelInput';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { useGetTipoServicoListQuery } from '../../tipoServico/TipoServicoSlice';
import { Dropdown } from 'primereact/dropdown';

interface CreateOrdemServicoProps {
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
}

export function CreateOrdemServico({ visibleAdicionar, onHideAdicionar }: CreateOrdemServicoProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [createOrdemServico, status] = useCreateOrdemServicoMutation();
    const { data: listTipoServico } = useGetTipoServicoListQuery();
    const { register, handleSubmit, control, setError, formState: { errors } } = useForm<OrdemServico>({
        defaultValues: {
            ordemServicoId: 0,
            ordemServicoNumero: "",
            tipoServico: {},
            ordemServicoStatus: 'EM_ANDAMENTO',
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

            <form className='grid' onSubmit={handleSubmit(onSubmit)}>
                <WrapperComLabel cols='12' label='N° da Ordem' >
                    <InputText {...register("ordemServicoNumero")} className={classNames('w-full', { 'p-invalid': errors.ordemServicoNumero })} />
                    {errors.ordemServicoNumero && (
                        <p role="alert" style={{ color: 'var(--red-700)' }}>
                            {errors.ordemServicoNumero?.message}
                        </p>
                    )}
                </WrapperComLabel>

                <WrapperComLabel cols='12' label='Tipo de Serviço' isObrigatorio>
                    <Controller
                        name="tipoServico"
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
                <Button type="submit" severity="success" label="Salvar" className="col-12" />
            </form>
        </Sidebar>
    )
}
