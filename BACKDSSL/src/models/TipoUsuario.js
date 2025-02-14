class TipoUsuario{
    static tableName = 'tipo_usuario';
    constructor(id, nombre, estado){
        this.id = id;
        this.nombre = nombre; 
        this.estado = estado;
    }
}

module.exports = TipoUsuario;