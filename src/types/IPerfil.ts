import { IParams } from "./IParams";
import { IRole } from "./IRole";
import { StatusEnum } from "./enuns/StatusEnum";

export interface IPerfil{
    id: number;
    nome: string;
    descricao: string;
    status: StatusEnum
    role:IRole[]
}

export interface IPerfilParams extends IParams{
    nome?: string;
}