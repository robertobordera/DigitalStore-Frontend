import { Users } from "../../auth/interfaces/users";

export interface marketPlace{
    id?:Number,
    titulo:string,
    precio:number,
    descripcion:string,
    imagen?:string,
    fechaSubida:Date,
    usuario_id?:number,
    categoria_id?:number,
    usuario?:Users
}