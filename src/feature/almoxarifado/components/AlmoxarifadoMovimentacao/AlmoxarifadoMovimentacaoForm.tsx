import React from 'react'
import { IMovimentacao } from '../../../../types/IMovimentacao'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { WrapperComLabel } from '../../../../components/WrapperFormLabelInput'
import { Dropdown, DropdownProps } from 'primereact/dropdown'
import { IAlmoxarifadoProduto } from '../../../../types/IAlmoxarifadoProduto'
import { classNames } from 'primereact/utils'
import { log } from 'console'
import { TipoMovimentacaoEnumOptions } from '../../../../types/enums/TipoMovimentacaoEnum'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { ButtonSalvar } from '../../../../components/ButtonComponent'

interface AlmoxarifadoMovimentacaoFormProps {
    errors: FieldErrors<IMovimentacao>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    isView?: boolean
    control: Control<IMovimentacao, any>
    isLoading: boolean
    onGoBack: () => void
    listaAlmoxarifadoProduto: IAlmoxarifadoProduto[]
}

export function AlmoxarifadoMovimentacaoForm({ onSubmit, isView, control, errors, isLoading, onGoBack, listaAlmoxarifadoProduto }: AlmoxarifadoMovimentacaoFormProps) {

    const getFormErrorMessage = (name: keyof IMovimentacao) => {
        return errors[name] ? <small className="p-error">{errors[name]!.message}</small> : <small className="p-error">&nbsp;</small>;
    };

    function valueTemplate(option: IAlmoxarifadoProduto, props: DropdownProps) {
        if (!option) {
            return props.placeholder;
        }
        return option.lote + ' - ' + option.produto.nome;
    }

    return (
        <form onSubmit={onSubmit} className="grid p-fluid col-12">
            <WrapperComLabel cols='12' label='Produtos' isObrigatorio>
                <Controller
                    name="almoxarifadoProduto"
                    control={control}
                    rules={{ required: 'Produto é obrigatório' }}
                    render={({ field, fieldState }) => (
                        <>
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="produto.nome"
                                itemTemplate={(option) => (`${option.lote} - ${option.produto.nome}`)}
                                valueTemplate={valueTemplate}
                                placeholder="Selecione o produto"
                                options={listaAlmoxarifadoProduto}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                filter
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </WrapperComLabel>

            <WrapperComLabel cols='12 6 ' label='Tipo de Movimentação' isObrigatorio>
                <Controller
                    name="tipoMov"
                    control={control}
                    rules={{ required: 'Tipo de movimentação é obrigatório' }}
                    render={({ field, fieldState }) => (
                        <>
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="label"
                                optionValue='code'
                                placeholder="Selecione o tipo de movimentação"
                                options={TipoMovimentacaoEnumOptions}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                filter
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </WrapperComLabel>

            <WrapperComLabel cols='12 6 ' label='Quantidade' isObrigatorio>
                <Controller
                    name="qtde"
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
                                onChange={(e) => field.onChange(e.originalEvent)}
                                inputClassName={classNames('w-full', { 'p-invalid': fieldState.error })}
                                className='w-full'
                                useGrouping={false}
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </WrapperComLabel>


            < WrapperComLabel label="Obeservação:" cols="12 "  >
                <Controller
                    name="observacao"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <InputTextarea
                                autoResize
                                id={field.name}
                                {...field}
                                rows={5}
                                cols={30}
                                className={classNames({ 'p-invalid': fieldState.error })}
                            />

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </ WrapperComLabel>

            <ButtonSalvar type="submit" severity="success" label="Salvar" className="col-12" />
        </form>
    )
}
