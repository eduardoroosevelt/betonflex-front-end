import { IMaterialFamilia } from "./IMaterialFamilia"

export interface IProduto{
    id : number
    nome: string
    descricao: string
    observacao: string
    sku: string
    ativo: boolean	
    created: string	
    materialFamilia: IMaterialFamilia
}

export interface IProdutoParams{
    page?: number;
    rows?: number;
    materialId?: number;
    materialFamiliaId?: number;
}