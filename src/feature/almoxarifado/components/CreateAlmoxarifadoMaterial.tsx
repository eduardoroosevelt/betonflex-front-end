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
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

interface CreateAlmoxarifadoMaterialProps {
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
    almoxarifadoId: number;
}

export function CreateAlmoxarifadoMaterial({ visibleAdicionar, onHideAdicionar, almoxarifadoId }: CreateAlmoxarifadoMaterialProps) {
    const { enqueueSnackbar } = useSnackbar();
    const { data: materiais, isFetching, } = useGetListMaterialQueNaoPertenceAoAmoxarifadoQuery({ almoxarifadoId });
    const [createAlmoxarifadoMaterial, almoxarifadoMaterialstatus] = useCreateAlmoxarifadoMaterialMutation()

    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<AlmoxarifadoMaterial>({
        defaultValues: {
            almoxarifado: {
                almoxarifadoId,
            },
        }
    });
    const watchFieldsQtde = watch("qtde");
    const watchFieldsValorUnitario = watch("valorUnitario");

    useEffect(() => {
        if (errors) {

        }
    }, [errors])

    useEffect(() => {
        if (almoxarifadoMaterialstatus.isSuccess) {
            enqueueSnackbar("Material vinculado com  sucesso", { variant: "success" });
            onHideAdicionar();
        }

    }, [almoxarifadoMaterialstatus.isSuccess, onHideAdicionar])

    useEffect(() => {
        if (watchFieldsQtde && watchFieldsValorUnitario) {
            setValue("valorTotal", watchFieldsQtde * watchFieldsValorUnitario)
        }

    }, [watchFieldsQtde, watchFieldsValorUnitario])

    async function onSubmit(data: AlmoxarifadoMaterial) {
        createAlmoxarifadoMaterial(data);
    }

    const getFormErrorMessage = (name: "material" | "almoxarifado" | "almoxarifadoMaterialId" | "valorUnitario" | "root" | "qtde") => {
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
            <form onSubmit={handleSubmit(onSubmit)} className='grid'>

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

                <WrapperComLabel cols='12' label='Lote' >
                    <InputText {...register("lote")} className={classNames('w-full', { 'p-invalid': errors.lote })} />
                    {errors.lote && (
                        <p role="alert" style={{ color: 'var(--red-700)' }}>
                            {errors.lote?.message}
                        </p>
                    )}
                </WrapperComLabel>

                <WrapperComLabel cols='6' label='Valor Unitário do material' >
                    <Controller
                        name="valorUnitario"
                        control={control}
                        rules={{
                            required: 'Entre com um valor acima de 0.',
                            validate: (value) => (value >= 0) || 'Entre com um valor acima de 0.'
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <InputNumber
                                    mode="currency"
                                    currency="BRL"
                                    locale="pt-BR"
                                    id={field.name}
                                    inputRef={field.ref}
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    onValueChange={(e) => field.onChange(e.value)}
                                    useGrouping={false}
                                    inputClassName={classNames('w-full', { 'p-invalid': fieldState.error })}
                                    className='w-full'
                                />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </WrapperComLabel>

                <WrapperComLabel cols='6' label='Quantidade' >
                    <Controller
                        name="qtde"
                        control={control}
                        rules={{
                            required: 'Entre com um valor acima de 0.',
                            validate: (value) => (value >= 0) || 'Entre com um valor acima de 0.'
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <InputNumber
                                    id={field.name}
                                    inputRef={field.ref}
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    onValueChange={(e) => field.onChange(e)}
                                    useGrouping={false}
                                    inputClassName={classNames('w-full', { 'p-invalid': fieldState.error })}
                                    className='w-full'
                                />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </WrapperComLabel>

                <WrapperComLabel cols='12' label='Valor Total' >
                    <Controller
                        name="valorTotal"
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <InputNumber
                                    mode="currency"
                                    currency="BRL"
                                    locale="pt-BR"
                                    id={field.name}
                                    inputRef={field.ref}
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    onValueChange={(e) => field.onChange(e)}
                                    useGrouping={false}
                                    inputClassName={classNames('w-full', { 'p-invalid': fieldState.error })}
                                    className='w-full'
                                    disabled
                                />

                            </>
                        )}
                    />
                </WrapperComLabel>

                <Button type="submit" severity="success" label="Salvar" className="col-12" />
            </form>


        </Sidebar>
    )
}
