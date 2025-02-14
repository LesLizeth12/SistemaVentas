import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/ProductoModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaproductoService } from 'src/app/services/categoriaproducto.service';
import { Categoria } from 'src/app/models/CategoriaModel';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
})
export class ProductoFormComponent implements OnInit {
  productoForm!: FormGroup;
  submited = false;
  producto: any={
    id_categoria:'1'
  }
  isEditMode = false;
  categorias:Categoria[]=[];

  ngOnInit(): void {
    this.loadCategories();
    this.productoForm = this.fb.group({
      id: [this.producto?.id],
      nombre: [this.producto?.nombre || '', Validators.required],
      precio: [this.producto?.precio || '', Validators.required],
      stock: [this.producto?.stock || '', Validators.required],
      estado: '1',
      id_categoria: [this.producto?.id_categoria || '', Validators.required]
    });
  }

  constructor(private categoriaService: CategoriaproductoService ,private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.productoForm = this.fb.group({
      nombre: [''],
      precio: [''],
      stock: [''],
      estado: '1',
      id_categoria: ['']
    });
  }

  onSubmit() {
    console.log("viene");
    this.submited = true;
    if(this.productoForm.valid){
      console.log("luego entra");
      this.activeModal.close(this.productoForm.value);
    }
  }

  loadCategories() {
    this.categoriaService.getCategorias().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => this.categorias = response,
      (error) => console.error("error en el loading product", error)
    )
  }
}
