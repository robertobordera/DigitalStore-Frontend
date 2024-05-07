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

export interface anyadirCarrito{
    producto_id:number,
    usuario_id:number
}

export interface Carrito{
    id:number,
    marcaModelo:string,
    imagen?:string,
    precio:number,
    entrega:string,
}