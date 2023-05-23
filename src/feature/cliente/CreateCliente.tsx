import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import { useCreateClienteMutation } from './ClienteSlice';
import { Cliente } from '../../types/Cliente';
import { useForm } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import { WrapperComLabel } from '../../components/WrapperFormLabelInput';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { Button } from 'primereact/button';


interface CreateClienteProps {
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
}

export default function CreateCliente({ visibleAdicionar, onHideAdicionar }: CreateClienteProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [createCliente, status] = useCreateClienteMutation();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Cliente>({
        defaultValues: {
            clienteId: 0,
            clienteNome: "",
            clienteDocumento: "",
            clienteCreateat: "",
        }
    });

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Cliente criado com  sucesso", { variant: "success" });
            onHideAdicionar();
        }
        if (status.error) {
            enqueueSnackbar("Cliente não criado", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    async function onSubmit(data: Cliente) {
        if (data.clienteNome === "") {
            setError("clienteNome", { type: "manual", message: "Nome não pode ser vazio" })
            return enqueueSnackbar("Nome não pode ser vazio", { variant: "error" });
        }
        await createCliente(data);
    }

    return (
        <Sidebar onHide={onHideAdicionar} visible={visibleAdicionar} className="w-11 md:w-4" position='right' >
            <h3>Cadastrar Cliente</h3>

            <form className='grid' onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit" severity="success" label="Salvar" className="col-12" />
            </form>
        </Sidebar>
    )
}
