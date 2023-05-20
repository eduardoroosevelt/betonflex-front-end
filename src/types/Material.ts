export interface Material {
    materialId: number
    materialNome: string
    materialDescricao: string
    materialObservacao: string
    materialSku: string
    materialAtivo: boolean
    materialCreateat: string

}

export interface MaterialParams {
    page?: number;
    rows?: number;
    search?: string;
    isActive?: boolean;
}

