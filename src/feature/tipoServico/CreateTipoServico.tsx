import React, { useEffect } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { useSnackbar } from 'notistack';
import { useCreateTipoServicoMutation } from './TipoServicoSlice';
import { TipoServico } from '../../types/TipoServico';
import { useForm } from 'react-hook-form';
import { WrapperComLabel } from '../../components/WrapperFormLabelInput';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

interface CreateTipoServicoProps {
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
}

export function CreateTipoServico({ visibleAdicionar, onHideAdicionar }: CreateTipoServicoProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [createTipoServico, status] = useCreateTipoServicoMutation();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<TipoServico>({
        defaultValues: {
            tipoServicoId: 0,
            tipoServicoNome: "",
            tipoServicoDescricao: "",
            tipoServicoAtivo: true,
            tipoServicoCreateat: ""

        }
    })

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Tipo de Serviço criado com  sucesso", { variant: "success" });
            onHideAdicionar();
        }
        if (status.error) {
            enqueueSnackbar("Tipo de Serviço não criado", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    async function onSubmit(data: TipoServico) {
        if (data.tipoServicoNome === "") {
            setError("tipoServicoNome", { type: "manual", message: "Nome não pode ser vazio" })
            return enqueueSnackbar("Nome não pode ser vazio", { variant: "error" });
        }
        await createTipoServico(data);
    }


    return (
        <Sidebar onHide={onHideAdicionar} visible={visibleAdicionar} className="w-11 md:w-4" position='right' >
            <h3>Cadastrar Tipo de Serviço</h3>

            <form className='grid' onSubmit={handleSubmit(onSubmit)}>
                <WrapperComLabel cols='12' label='Nome' >
                    <InputText {...register("tipoServicoNome")} className={classNames('w-full', { 'p-invalid': errors.tipoServicoNome })} />
                    {errors.tipoServicoNome && (
                        <p role="alert" style={{ color: 'var(--red-700)' }}>
                            {errors.tipoServicoNome?.message}
                        </p>
                    )}
                </WrapperComLabel>

                <WrapperComLabel cols='12' label='Descrição' >
                    <InputTextarea {...register("tipoServicoDescricao")} rows={5} className={classNames('w-full')} autoResize={true} />
                </WrapperComLabel>
                <Button type="submit" severity="success" label="Salvar" className="col-12" />
            </form>

        </Sidebar>
    )
}
