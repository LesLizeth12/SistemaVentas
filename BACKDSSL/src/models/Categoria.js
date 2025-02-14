class Categoria{
    static tableName = 'categoria';
    constructor(id,  nombre, estado){
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
    }
}
module.exports = Categoria;