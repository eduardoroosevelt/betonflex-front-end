import React, { useEffect } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { useGetListMaterialQueNaoPertenceAoAmoxarifadoQuery } from '../../materiais/materialSlice';
import { WrapperComLabel } from '../../../components/WrapperFormLabelInput';
import { Controller, useForm } from 'react-hook-form';
import { AlmoxarifadoMaterial } from '../../../types/Almoxarifado';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { useCreateAlmoxarifadoMaterialMutation } from '../almoxarifadoMaterialSlice';
import { useSnackbar } from 'notistack';

interface CreateAlmoxarifadoMaterialProps {
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
    almoxarifadoId: number;
}

export function CreateAlmoxarifadoMaterial({ visibleAdicionar, onHideAdicionar, almoxarifadoId }: CreateAlmoxarifadoMaterialProps) {
    const { enqueueSnackbar } = useSnackbar();
    const { data: materiais, isFetching, } = useGetListMaterialQueNaoPertenceAoAmoxarifadoQuery({ almoxarifadoId });
    const [createAlmoxarifadoMaterial, almoxarifadoMaterialstatus] = useCreateAlmoxarifadoMaterialMutation()

    const { register, control, handleSubmit, setError, formState: { errors } } = useForm<AlmoxarifadoMaterial>({
        defaultValues: {
            almoxarifado: {
                almoxarifadoId,
            },
        }
    });

    useEffect(() => {
        if (errors) {
            console.log(errors);
        }
    }, [errors])

    useEffect(() => {
        if (almoxarifadoMaterialstatus.isSuccess) {
            enqueueSnackbar("Material vinculado com  sucesso", { variant: "success" });
            onHideAdicionar();
        }

    }, [almoxarifadoMaterialstatus.isSuccess, onHideAdicionar])

    async function onSubmit(data: AlmoxarifadoMaterial) {
        createAlmoxarifadoMaterial(data);
    }

    const getFormErrorMessage = (name: "material" | "almoxarifado" | "almoxarifadoMaterialId" | "root") => {
        return errors[name] ? <small className="p-error">{errors[name]?.message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <Sidebar
            onHide={onHideAdicionar}
            visible={visibleAdicionar}
            className="w-11 md:w-4"
            position='right'
        >
            <h3>Vincular Material neste almoxarifado</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <WrapperComLabel cols='12' label='Escolher um material' isObrigatorio>
                    <Controller
                        name="material"
                        control={control}
                        rules={{ required: 'Material é obrigatório' }}
                        render={({ field, fieldState }) => (
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="materialNome"
                                placeholder="Seleciona um material"
                                options={materiais}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames('w-full', { 'p-invalid': fieldState.error })}
                            />
                        )}
                    />
                    {getFormErrorMessage('material')}
                </WrapperComLabel>
                <Button type="submit" severity="success" label="Salvar" className="col-12" />
            </form>


        </Sidebar>
    )
}