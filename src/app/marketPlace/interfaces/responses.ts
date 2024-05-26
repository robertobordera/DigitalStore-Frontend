import { comentarios, marketPlace, productoVendedor, subirProducto, ventas } from "./marketPlace";

export interface marketplaceResponse{
    data:marketPlace[]
}

export interface marketplaceSingleResponse{
    data:marketPlace
}

export interface ventasResponse{
    data:ventas[]
}

export interface comentariosResponse{
    comentarios:comentarios[]
}

export interface comentariosSingleResponse{
    comentario:comentarios
}

export interface subirResponse{
    success:boolean,
    message:string,
    data:subirProducto
}

export interface productoVendedorSingleResponse{
    data:productoVendedor
}

export interface subirResenyaResponse{
    success:boolean,
    message:string,
}