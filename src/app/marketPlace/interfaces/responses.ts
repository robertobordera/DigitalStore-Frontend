import { comentarios, marketPlace, ventas } from "./marketPlace";

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