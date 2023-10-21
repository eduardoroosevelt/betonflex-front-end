import React from 'react'
import { IMovimentacaoFilter } from '../../../../types/IMovimentacao'
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import { WrapperComLabel } from '../../../../components/WrapperFormLabelInput';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { ButtonConsultar } from '../../../../components/ButtonComponent';
import { useGetAlmoxarifadoProdutoListPorAlmoxarifadoQuery } from '../../almoxarifadoProdutoSlice';
import { IAlmoxarifadoProduto } from '../../../../types/IAlmoxarifadoProduto';

interface AlmoxarifadoMovimentacaoFilterProps {
    onPesquisar(filterModel: IMovimentacaoFilter): void
    almoxarifadoId: number,
    isFetching?: boolean,
    listaAlmoxarifadoProduto: IAlmoxarifadoProduto[]
}
export function AlmoxarifadoMovimentacaoFilter({ onPesquisar, almoxarifadoId, isFetching = false, listaAlmoxarifadoProduto }: AlmoxarifadoMovimentacaoFilterProps) {


    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<IMovimentacaoFilter>({
        defaultValues: {

        }
    });

    function onSubmit(model: IMovimentacaoFilter) {
        onPesquisar(model)
    }

    function valueTemplate(option: IAlmoxarifadoProduto, props: DropdownProps) {
        if (!option) {
            return props.placeholder;
        }
        return option.lote + ' - ' + option.produto.nome;
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid col-12">

            < WrapperComLabel label="Nome:" cols="12 " isObrigatorio >
                <Controller
                    name="almoxarifadoProdutoId"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <Dropdown
                                id={field.name}
                                dataKey='id'
                                value={field.value}
                                itemTemplate={(option) => (`${option.lote} - ${option.produto.nome}`)}
                                valueTemplate={valueTemplate}
                                optionValue='id'
                                placeholder="Selecione o produto"
                                options={listaAlmoxarifadoProduto || []}
                                focusInputRef={field.ref}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames({ 'p-invalid': fieldState.error })}
                                filter
                                showClear
                            />
                        </>
                    )}
                />
            </ WrapperComLabel>

            <div className={`col-12 md:col-6 lg:col-3 `}  >
                <ButtonConsultar />
            </div>
        </form>
    )
}
