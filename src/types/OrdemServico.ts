import { TipoServico } from "./TipoServico"

export interface OrdemServico {
    ordemServicoId: number
    ordemServicoNumero: string
    tipoServico: TipoServico
    ordemServicoStatus: "NOVO" | "EM_ANDAMENTO" | "FINALIZADO" | "CANCELADO"
    ordemServicoDataAbertura: string
    ordemServicoValor: number
}

export interface OrdemServicoParams {
    page?: number;
    rows?: number;
    search?: string;
    isActive?: boolean;
}

