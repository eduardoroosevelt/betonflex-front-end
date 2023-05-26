import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import { useCreateMaterialMutation } from './materialSlice';
import { useForm } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Material } from '../../types/Material';
import classNames from 'classnames';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { WrapperComLabel } from '../../components/WrapperFormLabelInput';
import { MaterialForm } from './components/MaterialForm';

interface CreateMaterialProps {
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
}

export function CreateMaterial({ visibleAdicionar, onHideAdicionar }: CreateMaterialProps) {

    const { enqueueSnackbar } = useSnackbar();
    const [createMaterial, status] = useCreateMaterialMutation();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Material>({
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
        if (status.isSuccess) {
            enqueueSnackbar("Material criado com  sucesso", { variant: "success" });
            onHideAdicionar();
        }
        if (status.error) {
            enqueueSnackbar("Material não criado", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    async function onSubmit(data: Material) {
        if (data.materialNome === "") {
            setError("materialNome", { type: "manual", message: "Nome não pode ser vazio" })
            return enqueueSnackbar("Nome não pode ser vazio", { variant: "error" });
        }
        await createMaterial(data);
    }


    return (
        <Sidebar onHide={onHideAdicionar} visible={visibleAdicionar} className="w-11 md:w-4" position='right' >
            <h3>Cadastrar Material</h3>
            <MaterialForm
                handleSubmit={handleSubmit(onSubmit)}
                erros={errors}
                register={register}
            />
            {/* <form className='grid' onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit" severity="success" label="Salvar" className="col-12" />
            </form> */}
        </Sidebar>
    )
}
