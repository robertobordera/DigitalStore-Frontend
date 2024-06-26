export interface Users {
   id?: number;
   nombre?: string;
   password?: string;
   correo: string;
   calle:string;
   numeroCalle:string;
   codigoPostal:string;
   provincia:string
   telefono?:string
   me?:boolean
   avatar:string
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

export interface anyadirFavorito{
    productousu_id:number,
    usuario_id:number
}

export interface mail{
    id?:number
    nombre:string,
    telefono:string,
    correo:string,
    titulo:string,
    fecha:string,
    enviador_id:number,
    receptor_id:number,
    productousu_id:number
}

export interface solicitud{
    usuario_enviador_id:number,
    usuario_receptor_id:number,
    productousu_id:number
}

export interface leerResenya{
    id:number,
    titulo:string,
    avatar:string,
    resenya:string,
    puntuacion:number,
    created_at:string,
    imagen:string
}