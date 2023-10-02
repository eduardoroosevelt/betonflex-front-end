import React from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { IProduto } from '../../../../types/IProduto'
import { WrapperComLabel } from '../../../../components/WrapperFormLabelInput'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'
import { IMaterialFamilia } from '../../../../types/IMaterialFamilia'
import { ButtonSalvar } from '../../../../components/ButtonComponent'

interface ProdutoFormProps {
    errors: FieldErrors<IProduto>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    isView?: boolean
    control: Control<IProduto, any>
    isLoading: boolean
    onGoBack: () => void
    listMaterialFamiliaAtivos: IMaterialFamilia[]
}

export function ProdutoForm({ onSubmit, isView, control, errors, isLoading, onGoBack, listMaterialFamiliaAtivos = [] }: ProdutoFormProps) {

    const getFormErrorMessage = (name: keyof IProduto) => {
        return errors[name] ? <small className="p-error">{errors[name]!.message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <form onSubmit={onSubmit} className="grid p-fluid col-12">
            < WrapperComLabel label="Nome:" cols="12 " isObrigatorio >
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
                                disabled={isView}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </ WrapperComLabel>

            < WrapperComLabel label="Descrição:" cols="12 " isObrigatorio >
                <Controller
                    name="descricao"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText
                                id={field.name}
                                placeholder='Descrição'
                                value={field.value}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                onChange={(e) => field.onChange(e.target.value)}
                                disabled={isView}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </ WrapperComLabel>
            < WrapperComLabel label="Observação:" cols="12 " isObrigatorio >
                <Controller
                    name="observacao"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText
                                id={field.name}
                                placeholder='Observação'
                                value={field.value}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                onChange={(e) => field.onChange(e.target.value)}
                                disabled={isView}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </ WrapperComLabel>

            < WrapperComLabel label="Nome:" cols="12 " isObrigatorio >
                <Controller
                    name="materialFamilia"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="nome"
                                placeholder="Selecione uma família de material"
                                options={listMaterialFamiliaAtivos}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames({ 'p-invalid': fieldState.error })}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </ WrapperComLabel>
            {
                onSubmit && !isView &&
                <div className={`col-12 md:col-6 lg:col-3 `}  >
                    <ButtonSalvar type="submit" severity="success" label="Salvar" className="col-12" loading={isLoading} />
                </div>
            }
        </form >
    )
}
