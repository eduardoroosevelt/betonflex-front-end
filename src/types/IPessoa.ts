import { StatusEnum } from "./enuns/StatusEnum"
import { TipoPessoaEnum } from "./enuns/TipoPessoaEnum"

export interface IPessoa {
    id: number | null
    nome: string
    cpf: string
    nomeFantasia: string
    cnpj: string
    telefone: string
    whatsapp: string
    email: string
    isFornecedor: boolean
    tipoPessoa: TipoPessoaEnum
    status: StatusEnum
}


export interface IPessoaParams {
    page?: number;
    rows?: number;
    nome?: string;
}

export interface IPessoaResponseGetId {
    id: number | null
    nome: string
    cpf: string
    nomeFantasia: string
    cnpj: string
    telefone: string
    whatsapp: string
    email: string
    isFornecedor: boolean
    tipoPessoa: TipoPessoaEnum
    status: StatusEnum
    accountNonExpired:boolean
    accountNonLocked:boolean
    credentialsNonExpired:boolean
}