import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/UsuarioModel';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { Persona } from 'src/app/models/PersonaModel';
import { PersonaService } from 'src/app/services/persona.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent } from '../gestionregistro/cliente-form/cliente-form.component';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-gestionregistro',
  templateUrl: './gestionregistro.component.html',
  styleUrls: ['./gestionregistro.component.css'],
})
export class GestionregistroComponent implements OnInit {
  @ViewChild('clienteModal') clienteModal?: ClienteFormComponent;
  personas: Persona[] = [];
  clienteForm: FormGroup;
  clientes: any[] = [];
  currentUserId?: number;
  editMode: boolean = false;
  constructor(
    private personaService: PersonaService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private alertify: AlertifyService
  ) {
    this.clienteForm = this.fb.group({
      id: [''],
      dni: [''],
      nombres: [''],
      apellidos: [''],
      direccion: [''],
      telefono: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    //this.loadPersons();
    this.loadClientes();
  }

  loadClientes(): void {
    this.personaService.getClients().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.clientes = response;
        console.log(response);
      },
      (error) => console.error('error en el loading', error)
    );
  }

  openModalCliente(persona?: Persona) {
    const modalRef = this.modalService.open(ClienteFormComponent);
    console.log(persona);
    if (persona) {
      modalRef.componentInstance.cliente = persona;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
      if (result) {
        if (result.id) {
          this.personaService.updatePerson(result.id, result).subscribe({
            next: () => {
              this.loadClientes(); // this.loadPersons()
              this.alertify.success('¡Cliente Actualizado!');
            },
            error: (err) => {
              console.error('Error al actualizar cliente:', err);
              this.alertify.error('Ocurrió un error al actualizar el cliente.');
            },
          });
        } else {
          this.personaService.createPerson(result).subscribe({
            next: () => {
              this.loadClientes(); // this.loadPersons()
              this.alertify.success('¡Cliente Agregado!');
            },
            error: (err) => {
              console.error('Error al agregar cliente:', err);
              this.alertify.error('Ocurrió un error al agregar el cliente.');
            },
          });
        }
        this.clienteForm.reset();
      }
    });
  }

  resetForm() {
    this.clienteForm.reset();
  }

  deleteCliente(id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar este cliente?',
      () => {
        this.personaService.deletePerson(id).subscribe(() => {
          this.loadClientes();
          this.alertify.error('¡Cliente Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar Cliente',
      }
    );
  }

  restoreCliente(id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.personaService.restoreCliente(id).subscribe(() => {
          this.loadClientes();
          this.alertify.success('¡Cliente Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar Cliente',
      }
    );
  }
}
