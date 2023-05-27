export interface Funcionario {
    funcionarioId: number
    funcionarioNome: string
    funcionarioCargo: string
    funcionarioAtivo: boolean
}


export interface FuncionarioParams {
    page?: number;
    rows?: number;
    search?: string;
}

