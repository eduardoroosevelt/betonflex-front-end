export interface IMaterial {
    id: number
    nome: string
    descricao: string
    ativo: boolean
    created: string

}

export interface IMaterialParams {
    page?: number;
    rows?: number;
    search?: string;
}

