import React from 'react'
import { Funcionario } from '../../../types/Funcionario'
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import { WrapperComLabel } from '../../../components/WrapperFormLabelInput'
import { InputText } from 'primereact/inputtext'
import { ToggleButton } from 'primereact/togglebutton';
import classNames from 'classnames'
import { Button } from 'primereact/button'

interface FuncionarioFormProps {
    handleSubmit: React.FormEventHandler<HTMLFormElement>
    erros: FieldErrors<Funcionario>
    register: UseFormRegister<Funcionario>
    control: Control<Funcionario, any>
    isEdit?: boolean
    goBack?: () => void
}


export function FuncionarioForm({ handleSubmit, erros: errors, register, control, isEdit = false, goBack = () => { } }: FuncionarioFormProps) {


    return (
        <form className='grid gap-2' onSubmit={handleSubmit}>
            {/* <WrapperComLabel cols='12' label='Ativo?' >
                <Controller
                    name="funcionarioAtivo"
                    control={control}
                    render={({ field, fieldState }) => (
                        <div className="flex flex-column align-items-center gap-2">
                            <ToggleButton
                                offLabel="Inativo"
                                onLabel="Ativo"
                                id={field.name}
                                checked={field.value}
                                onChange={field.onChange}
                                className={classNames('w-full', { 'p-invalid': fieldState.error })}
                            />
                            {errors.funcionarioAtivo && (
                                <p role="alert" style={{ color: 'var(--red-700)' }}>
                                    {errors.funcionarioAtivo?.message}
                                </p>
                            )}
                        </div>
                    )}
                />
            </WrapperComLabel> */}
            <WrapperComLabel cols='12' label='Nome' >
                <InputText {...register("funcionarioNome")} className={classNames('w-full', { 'p-invalid': errors.funcionarioNome })} />
                {errors.funcionarioNome && (
                    <p role="alert" style={{ color: 'var(--red-700)' }}>
                        {errors.funcionarioNome?.message}
                    </p>
                )}
            </WrapperComLabel>
            <WrapperComLabel cols='12' label='Cargo' >
                <InputText {...register("funcionarioCargo")} className={classNames('w-full', { 'p-invalid': errors.funcionarioCargo })} />
                {errors.funcionarioCargo && (
                    <p role="alert" style={{ color: 'var(--red-700)' }}>
                        {errors.funcionarioCargo?.message}
                    </p>
                )}
            </WrapperComLabel>

            <Button type="submit" severity="success" label="Salvar" className="col-12 md:col-2" />
            {
                isEdit && (<Button label="Voltar" onClick={goBack} className="col-12 md:col-2" />)
            }


        </form >
    )
}
