export interface Produto {
    id: number
    nome: string
    descricao: string
    observacao: string
    sku: string
    ativo: boolean
    created: string

}

export interface ProdutoParams {
    page?: number;
    rows?: number;
}

