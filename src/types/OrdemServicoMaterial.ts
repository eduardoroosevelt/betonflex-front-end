import { AlmoxarifadoMaterial } from "./Almoxarifado"
import { Funcionario } from "./Funcionario"
import { OrdemServico } from "./OrdemServico"

export interface OrdemServicoMaterial {
    ordemServicoMaterialId: number
    almoxarifadoMaterial: AlmoxarifadoMaterial
    ordemServico: OrdemServico
    ordemServicoMaterialData: string
    ordemServicoMaterialStatus: string
    funcionario: Funcionario
    ordemServicoMaterialValor: number
    almoxarifado_material_valor: number
    ordem_servico_material_qtd: number
}
