export interface Producto{
    id:number,
    marcaModelo:string,
    imagen?:string,
    precio:number,
    entrega:string,
    descripcion:string,
    caracteristicas:string,
    oferta:boolean,
    categoria:number
}

export interface ProductoValoracion{
    id:number,
    nombre:string,
    comentario:string,
    puntuacion:number,
    fecha:Date
}