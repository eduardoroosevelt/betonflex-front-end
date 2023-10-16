import React from 'react'
import { IAlmoxarifado } from '../../../../types/IAlmoxarifado'
import { AlmoxarifadoMovimentacaoTable } from './AlmoxarifadoMovimentacaoTable'
import { DataTableStateEvent } from 'primereact/datatable'

interface AlmoxarifadoMovimentacaoProps {
    almoxarifado: IAlmoxarifado
}
export function AlmoxarifadoMovimentacao({ almoxarifado }: AlmoxarifadoMovimentacaoProps) {
    return (
        <div>
            <AlmoxarifadoMovimentacaoTable
                data={undefined}
                rows={0}
                rowsPerPage={[]}
                isFetching={false}
                handleAdicionar={function (): void {
                    throw new Error('Function not implemented.')
                }}
                handleOnPageChange={function (page: DataTableStateEvent): void {
                    throw new Error('Function not implemented.')
                }}
                handleFilterChange={function (filterModel: DataTableStateEvent): void {
                    throw new Error('Function not implemented.')
                }}
            />
        </div>
    )
}
