import React, { useEffect } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { useSnackbar } from 'notistack';
import { useCreateTipoServicoMutation, useGetTipoServicoQuery, useUpdateTipoServicoMutation } from './TipoServicoSlice';
import { TipoServico } from '../../types/TipoServico';
import { useForm } from 'react-hook-form';
import { WrapperComLabel } from '../../components/WrapperFormLabelInput';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';

export function EditTipoServico() {
    const id = useParams().id;
    const { enqueueSnackbar } = useSnackbar();
    const { data: tipoServico, isFetching, refetch } = useGetTipoServicoQuery({ tipoServicoId: parseInt(id!) })
    const [updateTipoServico, status] = useUpdateTipoServicoMutation();
    const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm<TipoServico>({
        defaultValues: {
            tipoServicoId: 0,
            tipoServicoNome: "",
            tipoServicoDescricao: "",
            tipoServicoAtivo: true,
            tipoServicoCreateat: ""

        }
    })
    const navigation = useNavigate();

    useEffect(() => {
        if (tipoServico) {
            setValue("tipoServicoId", tipoServico?.tipoServicoId)
            setValue("tipoServicoNome", tipoServico?.tipoServicoNome)
            setValue("tipoServicoDescricao", tipoServico?.tipoServicoDescricao)
            setValue("tipoServicoAtivo", tipoServico?.tipoServicoAtivo)
            setValue("tipoServicoCreateat", tipoServico?.tipoServicoCreateat)
        }
    }, [tipoServico])

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Tipo de Serviço alterado com  sucesso", { variant: "success" });
            goBack()
        }
        if (status.error) {
            enqueueSnackbar("Tipo de Serviço não alterado", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    function goBack() {
        navigation('/app/cadastro/tipo-servico')
    }

    async function onSubmit(data: TipoServico) {
        if (data.tipoServicoNome === "") {
            setError("tipoServicoNome", { type: "manual", message: "Nome não pode ser vazio" })
            return enqueueSnackbar("Nome não pode ser vazio", { variant: "error" });
        }

        await updateTipoServico(data);
    }



    return (
        <div>
            <h3>Editar Tipo de Serviço</h3>

            <form className='grid gap-2' onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit" severity="success" label="Salvar" className="col-12 md:col-2" />
                <Button label="Voltar" onClick={goBack} className="col-12 md:col-2" />
            </form>
        </div>
    )
}
