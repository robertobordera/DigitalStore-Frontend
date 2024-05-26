import { Users, leerResenya, mail } from "./users";

export interface TokenResponse{
    token:string;
    success:boolean;
    message:string;
}

export interface UsuarioResponse{
    usuario:Users
}

export interface UsuarioCorreoResponse{
    success:boolean,
    message:string
}

export interface UsuarioPasswordResponse{
    success:boolean,
    message:string
}

export interface UsuarioDireccionResponse{
    success:boolean,
    message:string
}

export interface UsuarioNombreResponse{
    success:boolean,
    message:string
}

export interface mailResponse{
    success:boolean,
    solicitud:mail[]
}

export interface mailSingleResponse{
    success:boolean,
    solicitud:mail
}

export interface leerResenyaResponse{
    data:leerResenya[]
}
