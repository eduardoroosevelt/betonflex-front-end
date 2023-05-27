import React from 'react'
import { WrapperComLabel } from '../../../components/WrapperFormLabelInput'
import { OrdemServico } from '../../../types/OrdemServico'
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import classNames from 'classnames'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { useGetTipoServicoListQuery } from '../../tipoServico/TipoServicoSlice'

interface OrdemServicoFormProps {
    handleSubmit: React.FormEventHandler<HTMLFormElement>
    erros: FieldErrors<OrdemServico>
    register: UseFormRegister<OrdemServico>
    control: Control<OrdemServico, any>
}


export function OrdemServicoForm({ handleSubmit, erros: errors, register, control }: OrdemServicoFormProps) {
    const { data: listTipoServico } = useGetTipoServicoListQuery();

    return (
        <form className='grid' onSubmit={handleSubmit}>
            <WrapperComLabel cols='12' label='N° da Ordem' >
                <InputText {...register("ordemServicoNumero")} className={classNames('w-full', { 'p-invalid': errors.ordemServicoNumero })} />
                {errors.ordemServicoNumero && (
                    <p role="alert" style={{ color: 'var(--red-700)' }}>
                        {errors.ordemServicoNumero?.message}
                    </p>
                )}
            </WrapperComLabel>

            <WrapperComLabel cols='12' label='Data da Abertura' >
                <Controller
                    name="ordemServicoDataAbertura"
                    control={control}
                    rules={{ required: 'Data é obrigatório.' }}
                    render={({ field, fieldState }) => {
                        const [D, M, A] = field.value.split('/')
                        const date = new Date(`${M}/${D}/${A}`)

                        return (<>
                            <Calendar
                                inputId={field.name}
                                value={date}
                                onChange={(e) => {
                                    let data = e.value as Date
                                    field.onChange(data.toLocaleDateString('pt-BR'))
                                }}
                                dateFormat="dd/mm/yy"
                                className={classNames('w-full', { 'p-invalid': fieldState.error })}
                                appendTo="self"
                            />
                            {
                                errors.ordemServicoDataAbertura && (
                                    <p role="alert" style={{ color: 'var(--red-700)' }}>
                                        {errors.ordemServicoDataAbertura?.message}
                                    </p>
                                )
                            }
                        </>)
                    }}
                />
            </WrapperComLabel>

            <WrapperComLabel cols='12' label='Tipo de Serviço' isObrigatorio>
                <Controller
                    name="tipoServico"
                    control={control}
                    rules={{ required: 'Tipo Serviço é obrigatório' }}
                    render={({ field, fieldState }) => (
                        <Dropdown
                            id={field.name}
                            value={field.value}
                            optionLabel="tipoServicoNome"
                            placeholder="Selecione o tipo de serviço"
                            options={listTipoServico}
                            focusInputRef={field.ref}
                            onChange={(e) => field.onChange(e.value)}
                            className={classNames('w-full', { 'p-invalid': fieldState.error })}
                        />
                    )}
                />
            </WrapperComLabel>

            <WrapperComLabel cols='12' label='Valor da Ordem' >
                <Controller
                    name="ordemServicoValor"
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
                            {
                                errors.ordemServicoValor && (
                                    <p role="alert" style={{ color: 'var(--red-700)' }}>
                                        {errors.ordemServicoValor?.message}
                                    </p>
                                )
                            }
                        </>
                    )}
                />
            </WrapperComLabel>
            <Button type="submit" severity="success" label="Salvar" className="col-12" />
        </form>
    )
}
