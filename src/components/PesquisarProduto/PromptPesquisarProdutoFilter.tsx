import React from 'react'
import { PesquisarProdutoFilter } from './PromptPesquisarProduto'
import { Control, Controller } from 'react-hook-form'
import { IMaterial } from '../../types/Material'
import { IMaterialFamilia } from '../../types/IMaterialFamilia'
import classNames from 'classnames'
import { InputText } from 'primereact/inputtext'
import { WrapperComLabel } from '../WrapperFormLabelInput'
import { Dropdown } from 'primereact/dropdown'

interface PesquisarProdutoFilterProps {
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    control: Control<PesquisarProdutoFilter, any>
    isLoading: boolean
    listMaterialFamilia: IMaterialFamilia[]
    listMaterial: IMaterial[]
}

export function PromptPesquisarProdutoFilter({ onSubmit, control, isLoading, listMaterial, listMaterialFamilia }: PesquisarProdutoFilterProps) {
    return (
        <form onSubmit={onSubmit} className="grid p-fluid col-12">
            <WrapperComLabel label="Nome:" cols="12 " isObrigatorio>
                <Controller
                    name="nome"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText
                                id={field.name}
                                placeholder='Nome'
                                value={field.value}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        </>
                    )}
                />
            </ WrapperComLabel>
            <WrapperComLabel label="Material:" cols="12 " isObrigatorio>
                <Controller
                    name="materialId"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="name"
                                placeholder="Selecione um  Material"
                                options={listMaterial}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames({ 'p-invalid': fieldState.error })}
                            />
                        </>
                    )}
                />
            </ WrapperComLabel>
            <WrapperComLabel label="Família:" cols="12 " isObrigatorio>
                <Controller
                    name="familiaId"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="name"
                                placeholder="Selecione uma família"
                                options={listMaterialFamilia}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames({ 'p-invalid': fieldState.error })}
                            />
                        </>
                    )}
                />
            </ WrapperComLabel>
        </form>
    )
}
