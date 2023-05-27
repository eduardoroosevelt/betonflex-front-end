import { OrdemServico } from "./OrdemServico"

export interface OrdemServicoAnexo {
    ordemServicoAnexoId: number
    ordemServico: OrdemServico
    ordemServicoAnexoArqTipo: string
    ordemServicoAnexoArqNome: string
}
