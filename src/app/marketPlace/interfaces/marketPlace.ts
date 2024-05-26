import { Users } from "../../auth/interfaces/users";

export interface marketPlace{
    id?:number,
    titulo:string,
    precio:number,
    descripcion:string,
    imagen?:string,
    fechaSubida:Date,
    usuario_id?:number,
    categoria_id?:number,
    usuario?:Users
}

export interface ventas{
    id?:number,
    titulo:string,
    precio:number,
    fecha:Date,
    imagen:string,
    avatar:string
}

export interface CommentInsert {
    comentario: string;
}

export interface comentarios extends CommentInsert{
    id?:number,
    nombre:string,
    comentario:string,
    fecha:string
    avatar?:string
}

export interface subirProducto{
    titulo:string,
    descripcion:string,
    precio:number,
}

export interface productoVendedor{
    titulo:string,
    imagen:string,
    descripcion:string,
    nombre_usuario:string,
    avatar_usuario:string
}

export interface subirResenya{
    reseña:string,
    puntuacion:number,
    usuario_enviador_id:number,
    usuario_receptor_id:number,
    productousu_id:number
}



