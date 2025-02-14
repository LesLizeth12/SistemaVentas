import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from'src/app/models/CategoriaModel';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  categoriaForm!: FormGroup;
  submited = false;
  categoria: Categoria | undefined;
  isEditMode =false;

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      id: [this.categoria?.id],
      nombre: [this.categoria?.nombre || '', Validators.required],
      estado: '1'
    })
  }


  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.categoriaForm = this.fb.group({
        nombre: ['']
    })
  }


  onSubmit() {
    console.log("viene");
    this.submited = true;
    if(this.categoriaForm.valid){
      console.log("luego entra");
      this.activeModal.close(this.categoriaForm.value);
    }
  }

}
