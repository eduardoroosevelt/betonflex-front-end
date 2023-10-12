// import { Material } from "./Material";


export interface IAlmoxarifado {
    id: number;
    nome: string;
    descricao: string;
    ativo: boolean;
    created: string;
}

export interface IAlmoxarifadoParams {
    page?: number;
    rows?: number;
    search?: string;
    isActive?: boolean;
}

export interface AlmoxarifadoMaterial {
    almoxarifadoMaterialId: number;
    lote: string;
    valorUnitario: number
    valorTotal: number
    qtde: number
    qtdeUtilizada: number
    status: string
    data: string
}

// export interface AlmoxarifadoMaterialParams {
//     page?: number;
//     rows?: number;
//     search?: string;
//     almoxarifadoId?: number;
// }
