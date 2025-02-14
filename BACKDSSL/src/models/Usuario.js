class Usuario{
    static tableName = 'usuario';
    constructor(id, username, password, estado,id_tipousuario,id_persona){
        this.id = id;
        this.username = username;
        this.password = password;
        this.estado = estado;
        this.id_tipousuario = id_tipousuario;
        this.id_persona = id_persona;
    }
}

module.exports = Usuario;