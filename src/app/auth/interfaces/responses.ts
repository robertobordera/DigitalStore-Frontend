import { Users } from "./users";

export interface TokenResponse{
    token:string;
    success:boolean;
    message:string;
}

export interface UsuarioResponse{
    usuario:Users
}