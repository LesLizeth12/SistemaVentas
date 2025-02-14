class Producto{
    static tableName = 'producto';
    constructor(id, nombre, precio,stock,estado,id_categoria){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.estado = estado;
        this.id_categoria = id_categoria;
    }
}
module.exports = Producto;