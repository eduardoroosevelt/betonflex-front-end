import React from 'react'
import { WrapperComLabel } from '../../../components/WrapperFormLabelInput'
import { InputText } from 'primereact/inputtext'
import classNames from 'classnames'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Material } from '../../../types/Material'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'

interface MaterialFormProps {
    handleSubmit: React.FormEventHandler<HTMLFormElement>
    erros: FieldErrors<Material>
    register: UseFormRegister<Material>
}

export function MaterialForm({ handleSubmit, erros: errors, register }: MaterialFormProps) {
    return (
        <form className='grid' onSubmit={handleSubmit}>
            <WrapperComLabel cols='12' label='Nome' >
                <InputText {...register("materialNome")} className={classNames('w-full', { 'p-invalid': errors.materialNome })} />
                {errors.materialNome && (
                    <p role="alert" style={{ color: 'var(--red-700)' }}>
                        {errors.materialNome?.message}
                    </p>
                )}
            </WrapperComLabel>

            <WrapperComLabel cols='12' label='Descrição' >
                <InputText {...register("materialDescricao")} className={classNames('w-full')} />
            </WrapperComLabel>
            <WrapperComLabel cols='12' label='Sku' >
                <InputText {...register("materialSku")} className={classNames('w-full')} />
            </WrapperComLabel>

            <WrapperComLabel cols='12' label='Observação' >
                <InputTextarea {...register("materialObservacao")} rows={5} className={classNames('w-full')} autoResize={true} />
            </WrapperComLabel>

            <Button type="submit" severity="success" label="Salvar" className="col-12" />
        </form>
    )
}
