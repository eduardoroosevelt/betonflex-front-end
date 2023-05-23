export interface Cliente {
    clienteId: number
    clienteNome: string
    clienteDocumento: string
    clienteCreateat: string
}

export interface ClienteParams {
    page?: number;
    rows?: number;
    search?: string;
    isActive?: boolean;
}

