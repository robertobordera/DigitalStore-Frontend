export interface Users {
   id?: number;
   nombre?: string;
   password?: string;
   correo: string;
   calle:string;
   numeroCalle:string;
   codigoPostal:string;
   provincia:string
   latitud: number;
   longitud: number;
   ventas_count?:number
}

export interface UserLogin {
    correo: string;
    password: string;
    latitud?: number;
    longitud?: number;
}

export interface UserDireccion{
    calle:string,
    numeroCalle:string,
    codigoPostal:string,
    provincia:string
}

export interface usuarioCorreo {
   correo?:string
}

export interface UserAvatarEdit {
    avatar?: string;
}

export interface UserPasswordEdit {
    password?: string;
}

export interface UserNombre {
    nombre?: string;
}
