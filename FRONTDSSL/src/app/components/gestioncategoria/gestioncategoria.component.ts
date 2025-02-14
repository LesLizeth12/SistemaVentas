import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/models/CategoriaModel';

import { CategoriaproductoService } from 'src/app/services/categoriaproducto.service';
import { CategoriaFormComponent } from '../gestioncategoria/categoria-form/categoria-form.component'
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';


@Component({
  selector: 'app-gestioncategoria',
  templateUrl: './gestioncategoria.component.html',
  styleUrls: ['./gestioncategoria.component.css']
})
export class GestioncategoriaComponent implements OnInit {
  @ViewChild('categoriaModal') categoriaModal?: CategoriaFormComponent;
  categorias: Categoria [] = [];
  categoriaForm: FormGroup;
  currentUserId?: number;
  editMode: boolean = false;

  constructor(private categoriaproductoService :CategoriaproductoService , private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService){
    this.categoriaForm = this.fb.group({
      id: [''],
      nombre: [''],
    })
  }

  ngOnInit(): void {
    this.loadCategorias();
  } 


  loadCategorias(){
    this.categoriaproductoService.getCategorias().subscribe(
      (response) => this.categorias = response,
      (error) => console.error("Error al cargar las categorias", error)
    )
  }

  openModalCategoria(categoria?: Categoria) {
      const modalRef = this.modalService.open(CategoriaFormComponent);
      console.log(categoria);
      if (categoria) {
        modalRef.componentInstance.categoria = categoria;
        modalRef.componentInstance.isEditMode = true;
      }
  
      modalRef.result.then((result) => {
        if (result) {
          if (result.id) {
            this.categoriaproductoService.updateCategoria(result.id, result).subscribe({
              next: () => {
                this.loadCategorias(); // this.loadPersons()
                this.alertify.success('¡Categoria Actualizado!');
              },
              error: (err) => {
                console.error('Error al actualizar cliente:', err);
                this.alertify.error('Ocurrió un error al actualizar la categoria.');
              },
            });
          } else {
            this.categoriaproductoService.createCategoria(result).subscribe({
              next: () => {
                this.loadCategorias(); // this.loadPersons()
                this.alertify.success('¡Categoria Agregado!');
              },
              error: (err) => {
                console.error('Error al agregar cliente:', err);
                this.alertify.error('Ocurrió un error al agregar la categoria..');
              },
            });
          }
          this.categoriaForm.reset();
        }
      });
    }
  
    
  
  
    resetForm() {
      this.categoriaForm.reset();
    }
  
    deleteCategoria(id: number) {
      this.alertify.confirm2(
        '¿Estás seguro de que deseas eliminar esta categoria?',
        () => {
          this.categoriaproductoService.deleteCategoria(id).subscribe(() => {
            this.loadCategorias();
            this.alertify.error('¡Categoria Eliminado!');
          });
        },
        () => {
          // Acción a realizar si se cancela
          console.log('Acción cancelada');
        },
        {
          okText: 'Sí',
          cancelText: 'Cancelar',
          title: 'Eliminar Categoria',
        }
      );
    }

    restoreCategoria(id: number) {
      this.alertify.confirm2(
        '¿Estas seguro de habilitar el registro?',
        () => {
          this.categoriaproductoService.restoreCategoria(id).subscribe(() => {
            this.loadCategorias();
            this.alertify.success('¡Categoria Habilitado!');
          });
        },
        () => {
          // Acción a realizar si se cancela
          console.log('Acción cancelada');
        },
        {
          okText: 'Sí',
          cancelText: 'Cancelar',
          title: 'Habilitar Categoria',
        }
      );
    }
}
