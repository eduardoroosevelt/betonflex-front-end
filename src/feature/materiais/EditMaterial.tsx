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

    return (
        <div>
            <h3>Editar Material</h3>

            <form className='grid' onSubmit={handleSubmit(onSubmit)}>
                <WrapperComLabel cols='12' label='Nome' >
                    <InputText {...register("materialNome")} className={classNames('w-full', { 'p-invalid': errors.materialNome })} />
                    {errors.materialNome && (
                        <p role="alert" style={{ color: 'var(--red-700)' }}>
                            {errors.materialNome?.message}
                        </p>
                    )}
                </WrapperComLabel>

                <WrapperComLabel cols='12' label='Descrição' >
                    <InputTextarea {...register("materialDescricao")} rows={5} className={classNames('w-full')} autoResize={true} />
                </WrapperComLabel>
                <Button type="submit" severity="success" label="Salvar" className="col-12 md:col-2" />
            </form>
        </div>
    )
}
