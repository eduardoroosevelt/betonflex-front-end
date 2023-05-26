import React, { useEffect } from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useGetMaterialQuery, useUpdateMaterialMutation } from './materialSlice';
import { Material } from '../../types/Material';
import { WrapperComLabel } from '../../components/WrapperFormLabelInput';
import { useNavigate, useParams } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import { MaterialForm } from './components/MaterialForm';

export function EditMaterial() {
    const id = useParams().id;
    const { enqueueSnackbar } = useSnackbar();
    const { data: material, isFetching, refetch } = useGetMaterialQuery({ materialId: parseInt(id!) })
    const [updateMaterial, status] = useUpdateMaterialMutation();
    const navigation = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Material>({
        defaultValues: {
            materialId: 0,
            materialNome: "",
            materialDescricao: "",
            materialAtivo: true,
            materialCreateat: "",
            materialObservacao: "",
            materialSku: "",
        }
    });

    useEffect(() => {
        if (material) {
            setValue("materialId", material?.materialId)
            setValue("materialNome", material?.materialNome)
            setValue("materialDescricao", material?.materialDescricao)
            setValue("materialAtivo", material?.materialAtivo)
            setValue("materialCreateat", material?.materialCreateat)
            setValue("materialObservacao", material?.materialObservacao)
            setValue("materialSku", material?.materialSku)
        }
    }, [material])

    useEffect(() => {
        if (status.isSuccess) {
            setTimeout(() => {
                navigation('/app/cadastro/material')
            }, 0);
            enqueueSnackbar("Material alterado com sucesso", { variant: "success" });
        }
        if (status.error) {
            enqueueSnackbar("Erro  ao alterar o material", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    async function onSubmit(data: Material) {
        await updateMaterial(data);
    }

    function goBack() {
        navigation('/app/cadastro/material')
    }

    return (
        <div>
            <h3>Editar Material</h3>

            <MaterialForm
                handleSubmit={handleSubmit(onSubmit)}
                erros={errors}
                register={register}
            />
        </div>
    )
}
