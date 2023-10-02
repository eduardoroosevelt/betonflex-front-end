import React from 'react'
import { IMaterialFamilia } from '../../../../types/IMaterialFamilia'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { WrapperComLabel } from '../../../../components/WrapperFormLabelInput'
import { InputText } from 'primereact/inputtext'
import classNames from 'classnames'
import { ButtonSalvar } from '../../../../components/ButtonComponent'

interface MaterialFamiliaFormProps {
    errors: FieldErrors<IMaterialFamilia>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    isView?: boolean
    control: Control<IMaterialFamilia, any>
    isLoading: boolean
    onGoBack: () => void
}
export function MaterialFamiliaForm({ onSubmit, isView, control, errors, isLoading, onGoBack }: MaterialFamiliaFormProps) {

    const getFormErrorMessage = (name: keyof IMaterialFamilia) => {
        return errors[name] ? <small className="p-error">{errors[name]!.message}</small> : <small className="p-error">&nbsp;</small>;
    };
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
                                disabled={isView}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </WrapperComLabel>
            <WrapperComLabel label="Descricao:" cols="12 " isObrigatorio>
                <Controller
                    name="descricao"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText
                                id={field.name}
                                placeholder='Descricao'
                                value={field.value}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                onChange={(e) => field.onChange(e.target.value)}
                                disabled={isView}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </WrapperComLabel>

            {
                onSubmit && !isView &&
                <div className={`col-12 md:col-6 lg:col-3 `}  >
                    <ButtonSalvar type="submit" severity="success" label="Salvar" className="col-12" loading={isLoading} />
                </div>
            }
        </form>
    )
}
