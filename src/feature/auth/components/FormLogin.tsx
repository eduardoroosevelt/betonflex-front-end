import React from 'react'
import { Control, Controller, FieldErrors, FieldName, UseFormRegister } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password';
import { WrapperComLabel } from '../../../components/WrapperFormLabelInput'
import { ButtonPrimary, ButtonSecondary } from '../../../components/ButtonComponent'
import { ILogin } from '../../../types/ILogin'



interface FormLoginProps {
    register: UseFormRegister<ILogin>
    errors: FieldErrors<ILogin>
    control: Control<ILogin, any>
    isLoading: boolean
    onCadastrar: () => void
    onLogar?: React.FormEventHandler<HTMLFormElement>
    isView?: boolean
}

export function FormLogin({ onCadastrar, control, errors, onLogar, isLoading }: FormLoginProps) {

    const getFormErrorMessage = (name: FieldName<ILogin>) => {
        return errors[name] ? <small className="p-error">{errors[name]!.message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <form onSubmit={onLogar} className='flex flex-column  align-items-center  justify-content-center mb-1'>

            {/* <h1 style={{ color: 'var(--surface-0)' }} className='line-height-3 text-xl mb-1'  >Sistema Solar</h1> */}

            <div className='grid  p-fluid mb-2'>

                <WrapperComLabel label="CPF/CNPJ:" cols="12">
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'CPF/CNPJ é obrigatório.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <InputText
                                    ref={field.ref}
                                    id={field.name}
                                    name={field.name}
                                    placeholder='CPF/CNPJ'
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    autoFocus
                                />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </WrapperComLabel>

                <WrapperComLabel label="Senha:" cols="12">
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Senha é obrigatório.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <Password
                                    {...field}
                                    name={field.name}
                                    inputRef={field.ref}
                                    className={classNames({ 'p-invalid': fieldState.error })}
                                    type="password"
                                    placeholder='Senha'
                                    feedback={false}
                                    toggleMask
                                />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </WrapperComLabel>

            </div>

            <div className='flex justify-content-between align-items-center w-full'>
                <ButtonSecondary type='button' label="Esqueceu senha?" onClick={onCadastrar} disabled={isLoading} />
                <ButtonPrimary type='submit' label="Entrar" loading={isLoading} />
            </div>
        </form>
    )
}
