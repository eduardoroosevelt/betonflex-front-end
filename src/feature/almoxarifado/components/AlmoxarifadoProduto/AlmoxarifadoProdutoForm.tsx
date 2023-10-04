import React from 'react'
import { WrapperComLabel } from '../../../../components/WrapperFormLabelInput'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { InputNumber } from 'primereact/inputnumber'
import { classNames } from 'primereact/utils'
import { IAlmoxarifadoProduto } from '../../../../types/IAlmoxarifadoProduto'
import { ButtonSalvar } from '../../../../components/ButtonComponent'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { IProduto } from '../../../../types/IProduto'
import { PromptPesquisarProduto } from '../../../../components/PesquisarProduto/PromptPesquisarProduto'

interface AlmoxarifadoProdutoFormProps {
    errors: FieldErrors<IAlmoxarifadoProduto>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    isView?: boolean
    control: Control<IAlmoxarifadoProduto, any>
    isLoading: boolean
    onGoBack: () => void
    listProduto: IProduto[]
}

export function AlmoxarifadoProdutoForm({ onSubmit, isView, control, errors, isLoading, onGoBack, listProduto }: AlmoxarifadoProdutoFormProps) {

    const getFormErrorMessage = (name: keyof IAlmoxarifadoProduto) => {
        return errors[name] ? <small className="p-error">{errors[name]!.message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <form onSubmit={onSubmit} className="grid p-fluid col-12">
            {/* <PromptPesquisarProduto
                visible={true}
                produtoSelecionado={{} as IProduto}
                onHide={() => { }}
            /> */}
            <WrapperComLabel cols='12' label='Produtos' >
                <Controller
                    name="produto"
                    control={control}
                    rules={{ required: 'Produto é obrigatório' }}
                    render={({ field, fieldState }) => (
                        <>
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                optionLabel="nome"
                                placeholder="Selecione o produto"
                                options={listProduto}
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

            <WrapperComLabel cols='12' label='Lote' >
                <Controller
                    name="lote"
                    control={control}
                    rules={{ required: 'Nome é obrigatório' }}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText
                                id={field.name}
                                placeholder='Informe o lote'
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

            <WrapperComLabel cols='6' label='Valor Unitário do material' >
                <Controller
                    name="valorUnitario"
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
                                onValueChange={(e) => field.onChange(e.value)}
                                useGrouping={false}
                                inputClassName={classNames('w-full', { 'p-invalid': fieldState.error })}
                                className='w-full'
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </WrapperComLabel>

            <WrapperComLabel cols='6' label='Quantidade' >
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
                                onValueChange={(e) => field.onChange(e)}
                                useGrouping={false}
                                inputClassName={classNames('w-full', { 'p-invalid': fieldState.error })}
                                className='w-full'
                            />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
            </WrapperComLabel>

            <WrapperComLabel cols='12' label='Valor Total' >
                <Controller
                    name="valorTotal"
                    control={control}
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
                                onValueChange={(e) => field.onChange(e)}
                                useGrouping={false}
                                inputClassName={classNames('w-full', { 'p-invalid': fieldState.error })}
                                className='w-full'
                                disabled
                            />

                        </>
                    )}
                />
            </WrapperComLabel>

            <ButtonSalvar type="submit" severity="success" label="Salvar" className="col-12" />
        </form>
    )
}
