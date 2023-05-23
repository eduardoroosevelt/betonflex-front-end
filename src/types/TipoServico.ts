export interface TipoServico {
    tipoServicoId: number
    tipoServicoNome: string
    tipoServicoDescricao: string
    tipoServicoAtivo: boolean
    tipoServicoCreateat: string

}

export interface TipoServicoParams {
    page?: number;
    rows?: number;
    search?: string;
    isActive?: boolean;
}

