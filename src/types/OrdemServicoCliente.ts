import { Cliente } from "./Cliente"
import { OrdemServico } from "./OrdemServico"

export interface OrdemServicoCliente {
    ordemServicoClienteId: number
    cliente: Cliente
    ordemServico: OrdemServico

}
