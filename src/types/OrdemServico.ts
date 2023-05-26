import { TipoServico } from "./TipoServico"

export interface OrdemServico {
    ordemServicoId: number
    ordemServicoNumero: string
    tipoServico: TipoServico
    ordemServicoStatus: "EM_ANDAMENTO" | "FINALIZADO" | "CANCELADO"
    ordemServicoDataAbertura: string
}

export interface OrdemServicoParams {
    page?: number;
    rows?: number;
    search?: string;
    isActive?: boolean;
}

