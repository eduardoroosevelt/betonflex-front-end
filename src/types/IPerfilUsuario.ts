import { IParams } from "./IParams";
import { IPerfil } from "./IPerfil";
import { IRole } from "./IRole";
import { User } from "./IUser";

export interface IPerfilUsuario{
    id: number;
    perfil: IPerfil;
    user: User
}

export interface IPerfilUsuarioParams extends IParams{ 
    perfilId?: number;
}