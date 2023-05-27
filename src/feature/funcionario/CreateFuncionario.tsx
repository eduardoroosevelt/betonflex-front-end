import React, { useEffect } from 'react'
import { FuncionarioForm } from './components/FuncionarioForm';
import { Sidebar } from 'primereact/sidebar';
import { Funcionario } from '../../types/Funcionario';
import { useForm } from 'react-hook-form';
import { useCreateFuncionarioMutation } from './FuncionarioSlice';
import { useSnackbar } from 'notistack';

interface CreateFuncionarioProps {
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
}

export function CreateFuncionario({ visibleAdicionar, onHideAdicionar }: CreateFuncionarioProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [createFuncionario, status] = useCreateFuncionarioMutation();
    const { register, handleSubmit, setError, control, formState: { errors } } = useForm<Funcionario>({
        defaultValues: {
            funcionarioId: 0,
            funcionarioNome: "",
            funcionarioCargo: "",
            funcionarioAtivo: true,
        }
    });

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Funcionário criado com  sucesso", { variant: "success" });
            onHideAdicionar();
        }
        if (status.error) {
            enqueueSnackbar("Funcionário não criado", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    async function onSubmit(data: Funcionario) {
        if (data.funcionarioNome === "") {
            setError("funcionarioNome", { type: "manual", message: "Nome não pode ser vazio" })
            return enqueueSnackbar("Nome não pode ser vazio", { variant: "error" });
        }
        if (data.funcionarioCargo === "") {
            setError("funcionarioCargo", { type: "manual", message: "Cargo não pode ser vazio" })
            return enqueueSnackbar("Cargo não pode ser vazio", { variant: "error" });
        }
        await createFuncionario(data);
    }


    return (
        <Sidebar onHide={onHideAdicionar} visible={visibleAdicionar} className="w-11 md:w-4" position='right' >
            <h3>Cadastrar Material</h3>
            <FuncionarioForm
                handleSubmit={handleSubmit(onSubmit)}
                erros={errors}
                register={register}
                control={control}
            />

        </Sidebar>
    )
}
