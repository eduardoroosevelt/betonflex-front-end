import { IAlmoxarifadoProduto } from "./IAlmoxarifadoProduto";

export interface IMovimentacao {
    
    data: Date;
    id: number;
    observacao: string;
    status_mov: string,
    tipo_mov: 'ENTRADA' | 'SAIDA';
    qtde : number;
    ativo : boolean
    created : string;
    almoxarifado_produto : IAlmoxarifadoProduto
}