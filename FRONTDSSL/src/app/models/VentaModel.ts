export interface Venta{
    id?: number;
    precio_total: number;
    fecha_registro:string;
    estado: string;
    id_usuario: number;
    id_cliente: number;
}