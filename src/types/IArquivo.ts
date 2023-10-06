import { IAlmoxarifadoProduto } from "./IAlmoxarifadoProduto";

export interface IArquivo{
    id: number
	almoxarifadoProduto: IAlmoxarifadoProduto	
	nome: string		
	tipo: string	
	info: BinaryType	
	ativo: boolean
	created: string
}