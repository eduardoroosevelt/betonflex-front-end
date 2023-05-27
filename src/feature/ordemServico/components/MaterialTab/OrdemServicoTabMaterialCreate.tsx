import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useCreateOrdemServicoMaterialMutation } from '../../../ordemServicoMaterial/OrdemServicoMaterial';
import { OrdemServicoMaterial } from '../../../../types/OrdemServicoMaterial';
import { Controller, useForm } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import { WrapperComLabel } from '../../../../components/WrapperFormLabelInput';
import { Dropdown } from 'primereact/dropdown';
import { AlmoxarifadoMaterial } from '../../../../types/Almoxarifado';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Funcionario } from '../../../../types/Funcionario';
import { InputNumber } from 'primereact/inputnumber';
import { useGetFuncionarioListQuery } from '../../../funcionario/FuncionarioSlice';
import { useGetAlmoxarifadoMateriailListPorAlmoxarifadoQuery } from '../../../almoxarifado/almoxarifadoMaterialSlice';
import { Almoxarifado, useGetAlmoxarifadoListQuery } from '../../../almoxarifado/almoxarifadoSlice';

interface OrdemServicoTabMaterialCreateProps {
    ordemServicoId: number
    visibleAdicionar: boolean;
    onHideAdicionar: () => void;
}

export function OrdemServicoTabMaterialCreate({ ordemServicoId, visibleAdicionar, onHideAdicionar }: OrdemServicoTabMaterialCreateProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [createOrdemServicoMaterial, status] = useCreateOrdemServicoMaterialMutation();
    const { data: listFuncionario } = useGetFuncionarioListQuery()

    const [almoxarifadoSelecionado, setAlmoxarifadoSelecionado] = useState<Almoxarifado | null>(null)
    const { data: listAlmoxarifadoMaterial, refetch: refetchAlmoxarifadoMaterial, } = useGetAlmoxarifadoMateriailListPorAlmoxarifadoQuery({ almoxarifadoId: almoxarifadoSelecionado?.almoxarifadoId || 0 }, {})
    const { data: listAlmoxarifado } = useGetAlmoxarifadoListQuery()

    const { register, handleSubmit, control, watch, setError, formState: { errors } } = useForm<OrdemServicoMaterial>({
        defaultValues: {
            almoxarifadoMaterial: {
                almoxarifadoMaterialId: 0
            },
            ordemServico: {
                ordemServicoId
            },
            funcionario: {
                funcionarioId: 0
            },
            almoxarifado_material_valor: 0,
            ordemServicoMaterialValor: 0,
            ordem_servico_material_qtd: 0,
            ordemServicoMaterialId: 0

        }
    });

    useEffect(() => {
        if (almoxarifadoSelecionado) {
            refetchAlmoxarifadoMaterial()
        }
    }, [almoxarifadoSelecionado])

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Material vinculado com  sucesso", { variant: "success" });
            onHideAdicionar();
        }
        if (status.error) {
            enqueueSnackbar("Material não vinculado", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    function onSubmit(data: OrdemServicoMaterial) {
        createOrdemServicoMaterial(data)
    }


    return (
        <Sidebar onHide={onHideAdicionar} visible={visibleAdicionar} className="w-11 md:w-4" position='right' >
            <h4>Vincular Material nesta ordem de serviço</h4>
            <form className='grid' onSubmit={handleSubmit(onSubmit)}>
                <WrapperComLabel cols='12' label='Almoxarifado' >
                    <Dropdown
                        value={almoxarifadoSelecionado}
                        optionLabel="almoxarifadoNome"
                        placeholder="Selecione o Almoxarifado"
                        options={listAlmoxarifado}
                        onChange={(e) => setAlmoxarifadoSelecionado(e.value)}
                        className={classNames('w-full')}
                    />
                </WrapperComLabel>
                <WrapperComLabel cols='12' label='Material' isObrigatorio>
                    <Controller
                        name="almoxarifadoMaterial"
                        control={control}
                        rules={{ required: 'Material é obrigatório' }}
                        render={({ field, fieldState }) => (
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="material.materialNome"
                                placeholder="Selecione o material"
                                options={listAlmoxarifadoMaterial}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames('w-full', { 'p-invalid': fieldState.error })}
                            />
                        )}
                    />
                </WrapperComLabel>
                <WrapperComLabel cols='12' label='Funcionário' isObrigatorio>
                    <Controller
                        name="funcionario"
                        control={control}
                        rules={{ required: 'Funcionário é obrigatório' }}
                        render={({ field, fieldState }) => (
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="funcionarioNome"
                                placeholder="Selecione o funcionário"
                                options={listFuncionario}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames('w-full', { 'p-invalid': fieldState.error })}
                            />
                        )}
                    />
                </WrapperComLabel>
                <WrapperComLabel cols='6' label='Valor do material' >
                    <Controller
                        name="ordemServicoMaterialValor"
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
                                {errors.ordemServicoMaterialValor && (
                                    <p role="alert" style={{ color: 'var(--red-700)' }}>
                                        {errors.ordemServicoMaterialValor?.message}
                                    </p>
                                )}
                            </>
                        )}
                    />
                </WrapperComLabel>
                <WrapperComLabel cols='6' label='Quantidade' >
                    <Controller
                        name="ordem_servico_material_qtd"
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
                                {errors.ordem_servico_material_qtd && (
                                    <p role="alert" style={{ color: 'var(--red-700)' }}>
                                        {errors.ordem_servico_material_qtd?.message}
                                    </p>
                                )}
                            </>
                        )}
                    />
                </WrapperComLabel>
                <Button type="submit" severity="success" label="Salvar" className="col-12" />
            </form>
        </Sidebar>
    )
}
