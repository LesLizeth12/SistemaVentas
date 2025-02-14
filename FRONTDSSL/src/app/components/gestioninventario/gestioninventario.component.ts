import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/ProductoModel';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';
import { CategoriaproductoService } from 'src/app/services/categoriaproducto.service';
import { Categoria } from 'src/app/models/CategoriaModel';

@Component({
  selector: 'app-gestioninventario',
  templateUrl: './gestioninventario.component.html',
  styleUrls: ['./gestioninventario.component.css']
})
export class GestioninventarioComponent implements OnInit{
  @ViewChild('productoModal') productoModal?: ProductoFormComponent;
  productos:Producto[]=[];
  categorias:Categoria[]=[];
  productoForm:FormGroup;
  productosCombinados: any[] = []; 
  productosCombinados2: any[] = []; 
  constructor(private productoService: ProductoService,private categoriaService:CategoriaproductoService,private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService){
    this.productoForm = this.fb.group({
      id: [''],
      nombre: [''],
      precio: [''],
      stock: [''],
      id_categoria: ['']
    })
  }

  ngOnInit(): void {
    this.loadProductos();
    this.loadCategories();
  } 

  loadProductos(){
    this.productoService.getProducts().subscribe(
      (response) => {
        this.productos = response;
        this.combineData(); // Combina los datos después de cargar los usuarios
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  openModalProducto(producto?: Producto) {
        const modalRef = this.modalService.open(ProductoFormComponent);
        console.log(producto);
        if (producto) {
          modalRef.componentInstance.producto = producto;
          modalRef.componentInstance.isEditMode = true;
        }
    
        modalRef.result.then((result) => {
          if (result) {
            if (result.id) {
              this.productoService.updateProducto(result.id, result).subscribe({
                next: () => {
                  this.loadProductos(); // this.loadPersons()
                  this.alertify.success('¡Categoria Actualizado!');
                },
                error: (err) => {
                  console.error('Error al actualizar cliente:', err);
                  this.alertify.error('Ocurrió un error al actualizar la categoria.');
                },
              });
            } else {
              this.productoService.createProducto(result).subscribe({
                next: () => {
                  this.loadProductos(); // this.loadPersons()
                  this.alertify.success('¡Categoria Agregado!');
                },
                error: (err) => {
                  console.error('Error al agregar cliente:', err);
                  this.alertify.error('Ocurrió un error al agregar la categoria..');
                },
              });
            }
            this.productoForm.reset();
          }
        });
  }

  resetForm() {
    this.productoForm.reset();
  }

  deleteProducto(id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar este producto?',
      () => {
        this.productoService.deleteProducto(id).subscribe(() => {
          this.loadProductos();
          this.alertify.error('¡Producto Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar Producto',
      }
    );
  }

  restoreProducto(id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.productoService.restoreProducto(id).subscribe(() => {
          this.loadProductos();
          this.alertify.success('¡Producto Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar Producto',
      }
    );
  }

  loadCategories() {
    this.categoriaService.getCategorias().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.categorias = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  getCategoriaNombre(id_categoria: number): string {
    const cat = this.categorias.find(c => c.id === id_categoria);
    return cat ? cat.nombre : 'Sin Categoria';
  }

  combineData(): void {
    if (this.productos.length > 0 && this.categorias.length > 0 ) {
      this.productosCombinados = this.productos.filter(producto => {
        const categoria = this.categorias.find(c => c.id === producto.id_categoria);
        // Verifica si los tres registros tienen estado "0"
        return producto.estado === '1' && categoria?.estado === '1';
      }).map(producto => {
        const categoria = this.categorias.find(c => c.id === producto.id_categoria);

        return {
          ...producto, // Agrega los datos del usuario
          categoriaNombre: categoria?.nombre ?? 'Sin Categoria',
        };
      });
    }

  }

  combineData2(): void {
    if (this.productos.length > 0 && this.categorias.length > 0 ) {
      this.productosCombinados2 = this.productos.filter(producto => {
        const categoria = this.categorias.find(c => c.id === producto.id_categoria);

        // Verifica si los tres registros tienen estado "0"
        return producto.estado === '0' && categoria?.estado === '1' ;
      }).map(producto => {
        const categoria = this.categorias.find(c => c.id === producto.id_categoria);

        return {
          ...producto, // Agrega los datos del usuario
          categoriaNombre: producto?.nombre ?? 'Sin Categoria',
        };
      });
    }
  }
    
}
