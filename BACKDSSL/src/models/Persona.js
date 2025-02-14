class Persona{
    static tableName = 'persona';
    constructor(id, dni, nombres, apellidos,direccion,telefeno,email,estado){
        this.id = id;
        this.dni = dni;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefeno = telefeno;
        this.email = email;
        this.estado = estado;
    }
}

module.exports = Persona;