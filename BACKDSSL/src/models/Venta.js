class Venta{
    static tableName = 'venta';
    constructor(id, precio_total, fecha_registro, estado,id_usuario,id_cliente){
        this.id = id;
        this.precio_total = precio_total;
        this.fecha_registro = fecha_registro;
        this.estado = estado;
        this.id_usuario = id_usuario;
        this.id_cliente = id_cliente;
    }
}
module.exports = Venta;