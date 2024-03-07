import { StatusEnum } from "./enuns/StatusEnum"

export interface IRole{
    id: number
    nomeRole:string
    status: StatusEnum
}

export interface IRoleParams{
    page?: number
    rows?: number
    nome?: string
}