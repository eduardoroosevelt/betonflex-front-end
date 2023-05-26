import { Material } from "./Material";


export interface Almoxarifado {
    almoxarifadoId: number;
    almoxarifadoNome: string;
    almoxarifadoDescricao: string;
    almoxarifadoAtivo: boolean;
    almoxarifadoCreateat: string;
}

export interface AlmoxarifadoParams {
    page?: number;
    rows?: number;
    search?: string;
    isActive?: boolean;
}

export interface AlmoxarifadoMaterial {
    almoxarifadoMaterialId: number;
    almoxarifado: Almoxarifado;
    material: Material;
    lote: string;
    valorUnitario: number
    valorTotal: number
    qtde: number
    qtdeUtilizada: number
    status: string
    data: string
}

export interface AlmoxarifadoMaterialParams {
    page?: number;
    rows?: number;
    search?: string;
    almoxarifadoId?: number;
}
