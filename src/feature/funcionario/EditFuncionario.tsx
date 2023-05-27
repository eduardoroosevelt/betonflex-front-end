import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFuncionarioQuery, useUpdateFuncionarioMutation } from './FuncionarioSlice';
import { Funcionario } from '../../types/Funcionario';
import { useForm } from 'react-hook-form';
import { FuncionarioForm } from './components/FuncionarioForm';

export function EditFuncionario() {
    const id = useParams().id;
    const { enqueueSnackbar } = useSnackbar();
    const { data: funcionario, isFetching, refetch } = useGetFuncionarioQuery({ funcionarioId: parseInt(id!) })
    const [updateFuncionario, status] = useUpdateFuncionarioMutation();
    const navigation = useNavigate();

    const { register, handleSubmit, setValue, setError, control, formState: { errors } } = useForm<Funcionario>({
        defaultValues: {
            funcionarioId: 0,
            funcionarioNome: "",
            funcionarioCargo: "",
            funcionarioAtivo: true,
        }
    });

    useEffect(() => {
        if (funcionario) {
            setValue("funcionarioId", funcionario?.funcionarioId)
            setValue("funcionarioNome", funcionario?.funcionarioNome)
            setValue("funcionarioCargo", funcionario?.funcionarioCargo)
            setValue("funcionarioAtivo", funcionario?.funcionarioAtivo)
        }
    }, [funcionario])

    useEffect(() => {
        if (status.isSuccess) {
            setTimeout(() => {
                navigation('/app/cadastro/funcionario')
            }, 0);
            enqueueSnackbar("Funcionário alterado com sucesso", { variant: "success" });
        }
        if (status.error) {
            enqueueSnackbar("Erro  ao alterar o funcionário", { variant: "error" });

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
        await updateFuncionario(data);
    }

    function goBack() {
        navigation('/app/cadastro/funcionario')
    }

    return (
        <div>
            <h3>Editar Material</h3>

            <FuncionarioForm
                handleSubmit={handleSubmit(onSubmit)}
                erros={errors}
                register={register}
                control={control}
                isEdit
                goBack={goBack}
            />
        </div>
    )
}
