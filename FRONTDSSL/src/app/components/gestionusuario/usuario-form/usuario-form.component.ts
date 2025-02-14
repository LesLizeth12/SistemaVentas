import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/UsuarioModel';
import { Persona } from 'src/app/models/PersonaModel';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { PersonaService } from 'src/app/services/persona.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  selectedTipoUsuarioId: number | null = null;
  personaForm!: FormGroup;
  userForm!: FormGroup;
  submited = false;
  user: any = {
    id_tipousuario:'1'
  };
  persona: Persona | undefined;
  isEditMode = false;
  tipoUsuarios: any []=[];
  selectedCategoria: number = 0;

  constructor(private personaService: PersonaService, private fb: FormBuilder, private tipoUsuarioService: TipoUsuarioService, public activeModal: NgbActiveModal) {
    this.personaForm = this.fb.group({
      dni: [''],
      nombres: [''],
      apellidos: [''],
      direccion: [''],
      email: [''],
      telefono: [''],
      password: ['']
    })

    this.userForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    this.loadTipoUsuario();
    this.personaForm = this.fb.group({
      id: [this.user?.id],
      dni: [this.user?.dni || '', [Validators.required]],
      nombres: [this.user?.nombres || '',],
      apellidos: [this.user?.apellidos || '',],
      email: [this.user?.email || '', [Validators.required]],
      direccion: [this.user?.direccion || ''],
      telefono: [this.user?.telefono || ''],
      password: [this.user?.password || '', [Validators.required]],
      username: [this.user?.username || '', [Validators.required]],
      id_tipousuario: [this.user?.id_tipousuario || '', [Validators.required]],
      id_persona: [this.user?.id_persona || '']
    })
  }


  loadTipoUsuario(){
    this.tipoUsuarioService.getTiposUsers().subscribe(
      (response) => {
        this.tipoUsuarios = response;
      },
      (error) => console.error("error en el loading", error)
    );
  }

  onSelectChange(event: any): void {
    this.selectedTipoUsuarioId = +event.target.value; // Convert to number
    console.log('ID seleccionado:', this.selectedTipoUsuarioId);
  }

  

  onSubmit(){
    this.submited = true;
    
      this.activeModal.close(this.personaForm.value);
    
  }

  onCategoriaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedCategoriaId = Number(target.value);
    this.selectedCategoria = selectedCategoriaId;
    // Aplicar ambos filtros (nombre y categoría)
  }
}
