import { Producto, ProductoValoracion } from "./productos";

export interface ProductosResponse{
    success: boolean;
    datas: Producto[];
}

export interface ProductoResponse{
    success: boolean;
    data: Producto;
}

export interface ProductosValoracionesResponse{
    success:boolean,
    valoraciones:ProductoValoracion[];
}

export interface ProductoCategoriaResponse{
    success: boolean;
    productoCategoria: Producto[];
}