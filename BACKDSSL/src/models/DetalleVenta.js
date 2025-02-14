class DetalleVenta{
    static tableName = 'detalle_venta';
    constructor(id, cant_prod, importe, estado,id_venta,id_producto){
        this.id = id;
        this.cant_prod = cant_prod;
        this.importe = importe;
        this.estado = estado;
        this.id_venta = id_venta;
        this.id_producto = id_producto;
    }
}
module.exports = DetalleVenta;