import React from 'react'
import { WrapperComLabel } from '../../../components/WrapperFormLabelInput'
import { InputText } from 'primereact/inputtext'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { IAlmoxarifado } from '../../../types/IAlmoxarifado'
import { classNames } from 'primereact/utils'
import { ButtonSalvar } from '../../../components/ButtonComponent'

interface AlmoxarifadoFormProps {
    errors: FieldErrors<IAlmoxarifado>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    isView?: boolean
    control: Control<IAlmoxarifado, any>
    isLoading: boolean
    onGoBack: () => void
}

export function AlmoxarifadoForm({ onSubmit, isView, control, errors, isLoading, onGoBack }: AlmoxarifadoFormProps) {
    const getFormErrorMessage = (name: keyof IAlmoxarifado) => {
        return errors[name] ? <small className="p-error">{errors[name]!.message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <form onSubmit={onSubmit} className="grid p-fluid col-12">
            < WrapperComLabel label="Nome:" cols="12 " isObrigatorio >
                <Controller
                    name="nome"
                    control={control}
                    rules={{ required: 'Nome é obrigatório' }}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText
                                id={field.name}
                                placeholder='Nome do almoxarifado'
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

            < WrapperComLabel label="Descrição:" cols="12 "  >
                <Controller
                    name="descricao"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText
                                id={field.name}
                                placeholder='Breve descrição do almoxarifado'
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

            {
                onSubmit && !isView &&
                <div className={`col-12 md:col-6 lg:col-3 `}  >
                    <ButtonSalvar type="submit" severity="success" label="Salvar" className="col-12" loading={isLoading} />
                </div>
            }
        </form>
    )
}
