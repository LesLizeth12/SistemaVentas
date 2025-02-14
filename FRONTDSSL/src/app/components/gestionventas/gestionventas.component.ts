import { Component } from '@angular/core';
import { Categoria } from 'src/app/models/CategoriaModel';
import { Persona } from 'src/app/models/PersonaModel';
import { Producto } from 'src/app/models/ProductoModel';
import { CategoriaproductoService } from 'src/app/services/categoriaproducto.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ProductoService } from 'src/app/services/producto.service';
import jsPDF from 'jspdf';
import { VentaService } from 'src/app/services/venta.service';
import { Venta } from 'src/app/models/VentaModel';
import { DetalleVenta } from 'src/app/models/DetalleVentaModel';
import { DetalleventaService } from 'src/app/services/detalleventa.service';

@Component({
  selector: 'app-gestionventas',
  templateUrl: './gestionventas.component.html',
  styleUrls: ['./gestionventas.component.css'],
})
export class GestionventasComponent {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  clientes: Persona[] = [];
  clientesFiltrados: Persona[] = [];
  categorias: Categoria[] = [];
  selectedCategoria: number = 0; // Categoria seleccionada por el usuario
  nombreBusqueda: string = ''; // Campo para búsqueda por nombre
  dniBusqueda: string = '';
  carrito: any[] = [];
  productoSeleccionado: Producto | null = null;
  productoSeleccionadoIndex: number | null = null; // Índice del producto seleccionado en el carrito
  montoPago: number = 0;
  fechaActual: string;
  currentDate: string = new Date().toLocaleString();

  

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaproductoService,
    private personaService: PersonaService,
    private ventaService: VentaService,
    private detalleventaService: DetalleventaService
  ) {
    const hoy = new Date();
    // Obtener la fecha en formato 'DD-MM-YYYY'
    const dia = hoy.getDate().toString().padStart(2, '0'); // Día
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0'); // Mes de 0-11, sumamos 1
    const año = hoy.getFullYear();

    this.fechaActual = `${dia}/${mes}/${año}`;
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadPersons();
  }

  loadProducts() {
    this.productoService.getProducts().subscribe(
      (response) => {
        this.productos = response;
        this.productosFiltrados = response; // Inicialmente, mostramos todos los productos
      },
      (error) => console.error('Error al cargar productos', error)
    );
  }

  loadCategories() {
    this.categoriaService.getCategorias().subscribe(
      //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => (this.categorias = response),
      (error) => console.error('error en el loading product', error)
    );
  }

  loadPersons(): void {
    this.personaService.getPersons().subscribe(
      (data) => {
        this.clientes = data;
        this.clientesFiltrados = data; // Inicialmente mostramos todos los clientes
        console.log('Clientes cargados:', this.clientes); // Debugging
      },
      (error) => console.error('Error al cargar los clientes:', error)
    );
  }

  getCategoriaNombre(id_categoria: number): string {
    const cat = this.categorias.find((c) => c.id === id_categoria);
    return cat ? cat.nombre : 'Sin Categoria';
  }

  // Al cambiar la categoría en el combo box
  onCategoriaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedCategoriaId = Number(target.value);
    this.selectedCategoria = selectedCategoriaId;
    this.applyFilters(); // Aplicar ambos filtros (nombre y categoría)
  }

  // Al cambiar el nombre en el campo de búsqueda
  onNombreChange(event: Event): void {
    this.nombreBusqueda = (event.target as HTMLInputElement).value;
    this.applyFilters(); // Aplicar ambos filtros (nombre y categoría)
  }

  clienteSeleccionado: Persona | null = null;

  buscarCliente(): void {
    const dniNormalizado = this.dniBusqueda.trim().toLowerCase();
    if (!dniNormalizado) {
      this.clienteSeleccionado = null;
      alert('Por favor, ingrese un DNI para buscar.');
      return;
    }

    const cliente = this.clientes.find(
      (c) => c.dni.trim().toLowerCase() === dniNormalizado
    );

    this.clienteSeleccionado = cliente || null;

    if (!cliente) {
      alert('No se encontró ningún cliente con el DNI ingresado.');
    }
  }

  // Filtrar productos por nombre y categoría seleccionada
  applyFilters(): void {
    let productosFiltrados = this.productos;

    // Filtrar por nombre
    if (this.nombreBusqueda.trim()) {
      productosFiltrados = productosFiltrados.filter((producto) =>
        producto.nombre
          .toLowerCase()
          .includes(this.nombreBusqueda.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (this.selectedCategoria !== 0) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.id_categoria === this.selectedCategoria
      );
    }

    // Actualizar la lista de productos filtrados
    this.productosFiltrados = productosFiltrados;
  }

  seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado = producto;
  }

  // Método para agregar productos al carrito
  agregarAlCarrito(): void {
    if (!this.productoSeleccionado) {
      alert('Por favor, seleccione un producto antes de agregarlo al carrito.');
      return;
    }

    const cantidadStr = prompt(
      `Ingrese la cantidad para "${this.productoSeleccionado.nombre}" (Stock disponible: ${this.productoSeleccionado.stock}):`
    );
    if (!cantidadStr) return;

    const cantidad = Number(cantidadStr);

    if (
      isNaN(cantidad) ||
      cantidad <= 0 ||
      cantidad > this.productoSeleccionado.stock
    ) {
      alert('Cantidad inválida o superior al stock disponible.');
      return;
    }

    // Disminuir el stock del producto
    this.productoSeleccionado.stock -= cantidad;

    const total = this.productoSeleccionado.precio * cantidad;
    const index = this.carrito.findIndex(
      (item) => item.producto.id === this.productoSeleccionado!.id
    );

    if (index !== -1) {
      this.carrito[index].cantidad += cantidad;
      this.carrito[index].total += total;
    } else {
      this.carrito.push({
        producto: this.productoSeleccionado,
        cantidad,
        total,
      });
    }

    this.productoSeleccionado = null; // Limpiar selección después de agregar
  }

  // Método para seleccionar un producto en el carrito
  seleccionarProductoCarrito(index: number): void {
    console.log('FILA SELECCIONADA:' + index);
    this.productoSeleccionadoIndex = index;
  }

  getTotalCarrito(): number {
    return this.carrito.reduce((total, item) => total + item.total, 0);
  }

  getVuelto(): number {
    const total = this.getTotalCarrito(); // Total del carrito
    return this.montoPago - total; // Calcula el vuelto
  }

  procesarPago(): void {
    const total = this.getTotalCarrito();
    if (this.carrito.length === 0) {
      alert(
        'El carrito está vacío. Agrega productos antes de procesar el pago.'
      );
      return;
    }

    if (this.clienteSeleccionado?.id == null) {
      alert('Busque cliente.');
      return;
    }

    if (this.montoPago < total) {
      alert('El monto de pago es insuficiente.');
    } else {
      // Aquí puedes agregar la lógica para completar el pago
      alert('Pago procesado correctamente.');

      // Crear la venta
      const venta = {
        precio_total: total,
        id_cliente: this.clienteSeleccionado ? this.clienteSeleccionado.id : 0, // Usar 0 o algún valor predeterminado si es undefined
        fecha_registro: this.fechaActual,
        id_usuario: 1, // Suponiendo que el id del usuario es 1
        estado: '1',
      };

      this.ventaService.createVenta(venta).subscribe(
        (response) => {
          const idVenta = response.id; // Asumimos que el backend devuelve el id_venta

          this.carrito.forEach((item) => {
            const detalleVentaModel = {
              cant_prod: item.cantidad,
              importe: item.total,
              estado: '1',
              id_venta: idVenta || 0, // id_venta de la venta creada
              id_producto: item.producto.id,
            };

            // Guardar el detalle de la venta
            this.detalleventaService
              .createDetalleVenta(detalleVentaModel)
              .subscribe(
                () => {
                  console.log('Detalle de venta guardado');
                  // Actualizar el stock del producto en el inventario en el backend
                  const stockUpdate = {
                    id: item.producto.id,
                    nombre: item.producto.nombre,
                    precio: item.producto.precio,
                    stock: item.producto.stock,
                    estado: item.producto.estado,
                    id_categoria: item.producto.id_categoria,
                  };
                  this.productoService.updateProducto1(stockUpdate).subscribe(
                    () => {
                      console.log('Stock actualizado en el backend');
                    },
                    (error) => {
                      console.error(
                        'Error al actualizar el stock en el backend',
                        error
                      );
                      alert(
                        'Hubo un error al actualizar el stock del producto.'
                      );
                    }
                  );
                },
                (error) => {
                  console.error('Error al guardar detalle de venta', error);
                  alert('Hubo un error al guardar los detalles de la venta.');
                }
              );
          });

          // Generar el ticket PDF
          this.generarBoletaPDF(idVenta, total);
          //this.resetCarrito(); // Limpiar el carrito después del pago
        },
        (error) => {
          console.error('Error al procesar la venta:', error);
          alert('Ocurrió un error al procesar el pago.');
        }
      );
    }
  }

  generarBoletaPDF(idVenta: number | undefined, total: number): void {
    // Crear el documento con tamaño personalizado
    const doc = new jsPDF('p', 'mm', [80, 200]); // 'p' para orientación vertical, tamaño personalizado [ancho, alto]

    // Título del ticket
    doc.setFont('Times', 'bold');
    doc.setFontSize(14);
    doc.text('MINIMARKET J Y K', 40, 10, { align: 'center' });

    // Información de la venta
    doc.setFontSize(10);
    doc.text(`RUC: `, 40, 15, { align: 'center' });
    doc.text(`Direccion: `, 40, 20, { align: 'center' });
    doc.text(`Telefono: `, 40, 25, { align: 'center' });
    doc.text(`BOLETA DE VENTA ELECTRONICA `, 40, 30, { align: 'center' });
    doc.text(`BOLETA N°: ${idVenta || 0}`, 40, 35, { align: 'center' });
    doc.text(`Fecha: ${this.fechaActual}`, 40, 40, { align: 'center' });

    // Información del cliente
    doc.setFontSize(8);
    doc.text(`Cliente: ${this.clienteSeleccionado?.nombres}`, 5, 45);
    doc.text(`DNI: ${this.clienteSeleccionado?.dni}`, 5, 50);

    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(5, 55, 75, 55); // Ajustar la línea según el nuevo tamaño

    // Cabecera de la tabla de productos
    doc.setFont('Times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255); // Color de texto blanco
    doc.setFillColor(133, 193, 233); // Color de fondo (similar al Java)
    doc.rect(5, 56, 70, 13, 'F'); // Fondo de la celda

    doc.text('Producto', 7, 65);
    doc.text('Cantidad', 35, 65);
    doc.text('Precio', 70, 65, { align: 'right' });

    // Línea debajo de la cabecera
    doc.setLineWidth(0.5);
    doc.line(5, 70, 75, 70);

    // Detalles de los productos
    let yPosition = 75;
    this.carrito.forEach((item) => {
      doc.setTextColor(0, 0, 0); // Texto negro
      doc.text(item.producto.nombre, 7, yPosition);
      doc.text(`${item.cantidad}`, 35, yPosition);
      doc.text(`$${item.total.toFixed(2)}`, 70, yPosition, { align: 'right' });
      yPosition += 5;
    });

    // Línea separadora entre la tabla de productos y el total
    doc.setLineWidth(0.5);
    doc.line(5, yPosition, 75, yPosition);

    // Total
    doc.setFontSize(10);
    yPosition += 10;
    doc.text(`Total: $${total.toFixed(2)}`, 5, yPosition);

    // Pie de la boleta
    yPosition += 10;
    doc.setFontSize(8);
    doc.text('¡Gracias por su compra!', 40, yPosition, { align: 'center' });

    // Abrir el PDF en una nueva pestaña
    const pdfData = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfData);
    window.open(pdfUrl, '_blank');
  }

  // Método para eliminar el producto seleccionado en el carrito
  eliminarProducto(): void {
    if (this.productoSeleccionadoIndex === null) return; // No hacer nada si no hay producto seleccionado

    if (!confirm('¿Estás seguro de eliminar este producto del carrito?')) {
      return; // Si el usuario cancela la acción, no eliminar
    }

    const productoEliminado = this.carrito[this.productoSeleccionadoIndex];
    const productoInventario = this.productos.find(
      (p) => p.id === productoEliminado.producto.id
    );

    // Restaurar el stock del producto en inventario
    if (productoInventario) {
      productoInventario.stock += productoEliminado.cantidad;
    }

    // Eliminar el producto del carrito
    this.carrito.splice(this.productoSeleccionadoIndex, 1);

    // Resetear la selección
    this.productoSeleccionadoIndex = null;
  }
}
