import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/models/PersonaModel';
import { Usuario } from 'src/app/models/UsuarioModel';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { AlertifyService } from 'src/app/core/alertify.service';
import { UsuarioFormComponent } from 'src/app/components/gestionusuario/usuario-form/usuario-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-gestionusuario',
  templateUrl: './gestionusuario.component.html',
  styleUrls: ['./gestionusuario.component.css']
})
export class GestionusuarioComponent implements OnInit {
  @ViewChild('usuarioModal') usuarioModal?: UsuarioFormComponent;
  personaForm!: FormGroup;
  usuarios: Usuario[] = [];
  tipoUsuarios: TipoUsuario[] = [];
  personas: Persona[] = [];
  persona: Persona | undefined;
  usuariosCombinados: any[] = []; // Nuevo array para almacenar los datos combinados
  usuariosCombinados2: any[] = [];
  currentUserId?: number;
  editMode: boolean = false;

  user: any = {
    username:'',
    password:'',
    estado:'',
    id_tipousuario:'',
    id_persona:'',
  };

  persona2: any = {
    dni:'',
    nombres:'',
    apellidos:'',
    direccion:'',
    telefono:'',
    email:'',
    estado:'',
  }


  constructor(
    private usuarioService: UsuarioService,
    private personaService: PersonaService,
    private tipoUsuarioService: TipoUsuarioService,
    private alertify: AlertifyService, private modalService: NgbModal, private fb: FormBuilder
  ) { 
    this.personaForm = this.fb.group({
      dni: [''],
      nombres: [''],
      apellidos: [''],
      direccion: [''],
      email: [''],
      telefono: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadPersons();
    this.loadTipoUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsers().subscribe(
      (response) => {
        this.usuarios = response;
        this.combineData(); // Combina los datos después de cargar los usuarios
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  loadTipoUsuarios(): void {
    this.tipoUsuarioService.getTiposUsers().subscribe(
      (response) => {
        this.tipoUsuarios = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  loadPersons(): void {
    this.personaService.getPersons().subscribe(
      (response) => {
        this.personas = response;
        this.combineData(); // Combina los datos después de cargar las personas
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  combineData(): void {
    if (this.usuarios.length > 0 && this.personas.length > 0 && this.tipoUsuarios.length > 0) {
      this.usuariosCombinados = this.usuarios.filter(usuario => {
        const persona = this.personas.find(p => p.id === usuario.id_persona);
        const tipoUsuario = this.tipoUsuarios.find(tu => tu.id === usuario.id_tipousuario);

        // Verifica si los tres registros tienen estado "0"
        return usuario.estado === '1' && persona?.estado === '1' && tipoUsuario?.estado === '1';
      }).map(usuario => {
        const persona = this.personas.find(p => p.id === usuario.id_persona);
        const tipoUsuario = this.tipoUsuarios.find(tu => tu.id === usuario.id_tipousuario);

        return {
          ...usuario, // Agrega los datos del usuario
          dni: persona?.dni ?? 'Sin Dni',
          nombres: persona?.nombres ?? 'Sin Nombres',
          apellidos: persona?.apellidos ?? 'Sin Apellidos',
          direccion: persona?.direccion ?? 'Sin Direccion',
          telefono: persona?.telefono ?? 'Sin Telefono',
          email: persona?.email ?? 'Sin Email',
          tipoUsuarioNombre: tipoUsuario?.nombre ?? 'Sin Tipo Usuario'
        };
      });
    }

    //console.log(this.usuariosCombinados);
  }

  combineData2(): void {
    if (this.usuarios.length > 0 && this.personas.length > 0 && this.tipoUsuarios.length > 0) {
      this.usuariosCombinados2 = this.usuarios.filter(usuario => {
        const persona = this.personas.find(p => p.id === usuario.id_persona);
        const tipoUsuario = this.tipoUsuarios.find(tu => tu.id === usuario.id_tipousuario);

        // Verifica si los tres registros tienen estado "0"
        return usuario.estado === '0' && persona?.estado === '1' && tipoUsuario?.estado === '1';
      }).map(usuario => {
        const persona = this.personas.find(p => p.id === usuario.id_persona);
        const tipoUsuario = this.tipoUsuarios.find(tu => tu.id === usuario.id_tipousuario);

        return {
          ...usuario, // Agrega los datos del usuario
          idperson: persona?.id ?? 'Sin Dni',
          dni: persona?.dni ?? 'Sin Dni',
          nombres: persona?.nombres ?? 'Sin Nombres',
          apellidos: persona?.apellidos ?? 'Sin Apellidos',
          direccion: persona?.direccion ?? 'Sin Direccion',
          telefono: persona?.telefono ?? 'Sin Telefono',
          email: persona?.email ?? 'Sin Email',
          tipoUsuarioNombre: tipoUsuario?.nombre ?? 'Sin Tipo Usuario'
        };
      });
    }
  }

  openModalUsuario(usercombined?: any) {
    const modalRef = this.modalService.open(UsuarioFormComponent);
      if (usercombined) {
        modalRef.componentInstance.user = usercombined;
        modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
     
      this.user.username=result.username;
      this.user.password=result.password;
      this.user.estado='1';
      this.user.id_tipousuario=result.id_tipousuario;
      this.user.id_persona=parseInt(result.id_persona);

      
      this.persona2.dni=result.dni;
      this.persona2.nombres=result.nombres;
      this.persona2.apellidos=result.apellidos;
      this.persona2.direccion=result.direccion;
      this.persona2.telefono=result.telefono;
      this.persona2.email=result.email;
      this.persona2.estado='1';

      if (result) {
        if (result.id) {
          this.user.id=result.id;
          this.persona2.id=result.id_persona;
          this.usuarioService.updateUser(this.user.id,this.user).subscribe({
            next: () => {
              this.personaService.updatePerson(this.persona2.id,this.persona2).subscribe(() => {
                this.loadUsuarios();
                this.loadPersons();
                this.loadTipoUsuarios();
                this.alertify.success('¡Usuario Actualizado!');
                console.log(this.user);
              })
            },
            error: (err) => {
              console.error('Error al actualizar cliente:', err);
              this.alertify.error('Ocurrió un error al actualizar el cliente.');
            }
          })
        } else {
          this.usuarioService.createUser(this.user).subscribe({
            next: () => {
              this.personaService.createPerson(this.persona2).subscribe(() => {
                this.loadUsuarios();
                this.loadPersons();
                this.loadTipoUsuarios();
                this.alertify.success('¡Usuario Creado!');
              })
            },
            error: (err) => {
              console.error('Error al actualizar cliente:', err);
              this.alertify.error('Ocurrió un error al Crear el Usuario.');
            }
          })
        }
        this.resetForm();
      }
    })

  }

  deleteUsuario(id: number) {
    this.alertify.confirm2(
      "¿Estás seguro de que deseas eliminar este Usuario?",
      () => {
        this.usuarioService.deleteUser(id).subscribe(() => {
          this.ngOnInit();
          this.alertify.success('Usuario Eliminado!');
        })
      },
      () => {
        // Acción a realizar si se cancela
        console.log("Acción cancelada");
      },
      {
        okText: "Sí",
        cancelText: "Cancelar",
        title: "Eliminar Usuario"
      }
    );
  }

  restoreUsuario(id: number) {
    this.alertify.confirm2(
      "¿Estás seguro de que deseas Habilitar este Usuario?",
      () => {
        this.usuarioService.restoreUser(id).subscribe(() => {
          this.ngOnInit();
          this.alertify.success('Usuario Habilitado!');
        })
      },
      () => {
        // Acción a realizar si se cancela
        console.log("Acción cancelada");
      },
      {
        okText: "Sí",
        cancelText: "Cancelar",
        title: "Habilitar Usuario"
      }
    );
  }

  mostrarDetalleUsuario(row: any) {
    const message = `
      <strong>ID:</strong> ${row.id} <br>
      <strong>DNI:</strong> ${row.dni} <br>
      <strong>NOMBRES:</strong> ${row.nombres}<br>
      <strong>APELLIDOS:</strong> ${row.apellidos} <br>
      <strong>TELEFONO:</strong> ${row.telefono} <br>
      <strong>DIRECCION:</strong> ${row.direccion} <br>
      <strong>EMAIL:</strong> ${row.email} <br>
      <strong>TIPO USUARIO:</strong> ${row.tipoUsuarioNombre} <br>
    `;

    const title = `<h4>Detalles del Usuario:</h4>`;

    this.alertify.alert(message, title, () => {
      this.alertify.message('Detalles visualizados.');
    });


  }

  resetForm() {
    this.personaForm.reset();
  }
}
