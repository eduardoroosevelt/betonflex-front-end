import { IParams } from "./IParams";
import { IPessoa } from "./IPessoa";
import { IRole } from "./IRole";

export interface User{
    userId:number
    username:string
    accountNonExpired:boolean
    accountNonLocked:boolean
    credentialsNonExpired:boolean
    enabled:boolean
    roles: IRole[]
    pessoa: IPessoa
}

export interface IUserParams extends IParams{
}