import { IMaterial } from "./Material";

export interface IMaterialFamilia{
    id:number
    descricao: string
    nome:string
    material: IMaterial
}

export interface IMaterialFamiliaParams{
    page?: number;
    rows?: number;
    search?: string;
    materialId?: number;
}