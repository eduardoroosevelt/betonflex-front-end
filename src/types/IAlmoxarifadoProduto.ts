import { IAlmoxarifado } from "./IAlmoxarifado"
import { IProduto } from "./IProduto"
import { IArquivo } from "./IArquivo"

export interface IAlmoxarifadoProduto{
    id: number
    almoxarifado: IAlmoxarifado
    produto: IProduto
    lote:string
    valorUnitario:number
    valorTotal:number
    qtde:number
    qtdUtilizada:number
    created:string
    maquina:string	
	resistencia:number	
	dataProducao: string 
    listaArquivos:IArquivo[]
}

export interface IAlmoxarifadoProdutoParams{
    page?: number;
    rows?: number;
    almoxarifadoId?: number;
}