import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoUsuario } from'src/app/models/TipoUsuarioModel';


@Component({
  selector: 'app-tipo-usuario-form',
  templateUrl: './tipo-usuario-form.component.html',
  styleUrls: ['./tipo-usuario-form.component.css']
})
export class TipoUsuarioFormComponent implements OnInit {

  tipoUserForm!: FormGroup;
  submited = false;
  tipo_usuario: TipoUsuario | undefined;
  isEditMode =false;

  ngOnInit(): void {
    this.tipoUserForm = this.fb.group({
      id: [this.tipo_usuario?.id],
      nombre: [this.tipo_usuario?.nombre || '', Validators.required]
    })
  }

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.tipoUserForm = this.fb.group({
        nombre: ['']
    })
  }

  onSubmit() {
    this.submited = true;
    if(this.tipoUserForm.valid){
      this.activeModal.close(this.tipoUserForm.value);
    }
  }



}
