import React from 'react'
import { WrapperComLabel } from '../../../components/WrapperFormLabelInput'
import { InputText } from 'primereact/inputtext'
import classNames from 'classnames'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IMaterial } from '../../../types/Material'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'

interface MaterialFormProps {
    handleSubmit?: React.FormEventHandler<HTMLFormElement>
    erros: FieldErrors<IMaterial>
    register: UseFormRegister<IMaterial>
    isLoading?: boolean
}

export function MaterialForm({ handleSubmit, erros: errors, register, isLoading }: MaterialFormProps) {
    return (
        <form className='grid' onSubmit={handleSubmit}>
            <WrapperComLabel cols='12' label='Nome' >
                <InputText {...register("nome")} className={classNames('w-full', { 'p-invalid': errors.nome })} />
                {errors.nome && (
                    <p role="alert" style={{ color: 'var(--red-700)' }}>
                        {errors.nome?.message}
                    </p>
                )}
            </WrapperComLabel>

            <WrapperComLabel cols='12' label='Descrição' >
                <InputText {...register("descricao")} className={classNames('w-full')} />
            </WrapperComLabel>

            {
                handleSubmit &&
                <div className={`col-12 md:col-6 lg:col-2 `}  >
                    <Button type="submit" severity="success" label="Salvar" className="col-12" loading={isLoading} />
                </div>
            }
        </form>
    )
}
