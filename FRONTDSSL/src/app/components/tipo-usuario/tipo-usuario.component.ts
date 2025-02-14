import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { TipoUsuarioFormComponent } from 'src/app/components/tipo-usuario/tipo-usuario-form/tipo-usuario-form.component';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {


  tipoUser: TipoUsuario[] = [];
  tipoUserForm: FormGroup;
  tipo_usuarios: any[] = [];
  currentTipoUserId?: number;
  editMode: boolean = false;
  constructor(private tipoUserService: TipoUsuarioService, private fb: FormBuilder, private modalService: NgbModal, private alertify: AlertifyService) {
    this.tipoUserForm = this.fb.group({
      nombre: ['']
    })
  }

  ngOnInit(): void {
    this.loadTipoUsers();
  }


  loadTipoUsers(): void {
    this.tipoUserService.getTiposUsers().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.tipo_usuarios = response;
        console.log(response)
      },
      (error) => console.error("error en el loading", error)
    )
  }

  openModalTipoUsuario(tipo_usuario?: TipoUsuario) {
    const modalRef = this.modalService.open(TipoUsuarioFormComponent);
    console.log(tipo_usuario)
    if (tipo_usuario) {
      modalRef.componentInstance.tipo_usuario = tipo_usuario;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
      if (result) {
        if (result.id) {
          this.tipoUserService.updateTiposUser(result.id, result).subscribe({
            next: () => {
              this.loadTipoUsers(); // this.loadPersons()
              this.alertify.success('Tipo Usuario Actualizado!');
            },
            error: (err) => {
              console.error('Error al actualizar cliente:', err);
              this.alertify.error('Ocurrió un error al actualizar el cliente.');
            }
          });
        } else {
          this.tipoUserService.createTiposUser(result).subscribe({
            next: () => {
              this.loadTipoUsers(); // this.loadPersons()
              this.alertify.success('Tipo Usuario Agregado!');
            },
            error: (err) => {
              console.error('Error al agregar cliente:', err);
              this.alertify.error('Ocurrió un error al agregar el cliente.');
            }
          });
        }
        this.tipoUserForm.reset();
      }

    })
  }


  resetForm() {
    this.tipoUserForm.reset();
  }

  deleteTipoUser(id: number) {
    this.alertify.confirm2(
      "¿Estás seguro de que deseas eliminar este Tipo Usuario?",
      () => {
        this.tipoUserService.deleteTiposUser(id).subscribe(() => {
          this.loadTipoUsers();
          this.alertify.error('Tipo Usuario Eliminado!');
        })
      },
      () => {
        // Acción a realizar si se cancela
        console.log("Acción cancelada");
      },
      {
        okText: "Sí",
        cancelText: "Cancelar",
        title: "Eliminar Tipo Usuario"
      }
    );
  }

  restoreTipoUser(id: number) {
    this.alertify.confirm2(
      "¿Estas seguro de habilitar el Tipo Usuario?",
      () => {
        this.tipoUserService.restoreTipoUser(id).subscribe(() => {
          this.loadTipoUsers();
          this.alertify.success('Tipo Usuario Habilitado!');
        })
      },
      () => {
        // Acción a realizar si se cancela
        console.log("Acción cancelada");
      },
      {
        okText: "Sí",
        cancelText: "Cancelar",
        title: "Habilitar Tipo Usuario"
      }
    );
  }

}
