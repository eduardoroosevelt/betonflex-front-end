import { IAlmoxarifadoProduto } from "./IAlmoxarifadoProduto";
import { TipoMovimentacaoEnum } from "./enums/TipoMovimentacaoEnum";

export interface IMovimentacao {
    
    data: Date;
    id: number;
    observacao: string;
    statusMov: string,
    tipoMov: TipoMovimentacaoEnum;
    qtde : number;
    ativo : boolean
    created : string;
    almoxarifadoProduto : IAlmoxarifadoProduto
}

export interface IMovimentacaoParams extends IMovimentacaoFilter{
    page?: number;
    rows?: number;
    rowsPerPage?: number[];
 
}

export interface IMovimentacaoFilter{
    almoxarifadoProdutoId?: number;
    almoxarifadoId?: number;
}